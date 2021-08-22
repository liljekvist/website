/**
 *
 *  filters_CorsFilter.cc
 *
 */

#include "filters_CorsFilter.h"

using namespace drogon;
using namespace filters;

void CorsFilter::doFilter(const HttpRequestPtr &req,
                         FilterCallback &&fcb,
                         FilterChainCallback &&fccb)
{
    LOG_DEBUG << req->getMethodString();
    if (req->getMethod()==HttpMethod::Options)
    {
        LOG_DEBUG << "är i filter";
        auto &origin = req->getHeader("Origin");      //Dynamisk origin går att ha tills senare. Nackdel är att api nås från hela nätet och blir sårbart för ddos eller dos
        //std::string origin = "https://192.168.0.250"
        auto resp = HttpResponse::newHttpResponse();
        resp->addHeader("Access-Control-Allow-Origin", origin);
        resp->addHeader("Access-Control-Allow-Methods", "OPTIONS,POST,PUT");
        resp->addHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
        resp->addHeader("Access-Control-Allow-Credentials","true");
        fcb(resp);
        return;
    }
    fccb();
}
