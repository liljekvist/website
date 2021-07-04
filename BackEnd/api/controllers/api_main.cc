#include "api_main.h"
using namespace api;
//add definition of your processing function here


void main::jsonTest(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback){
    LOG_DEBUG<< "Test";
    Json::Value ret;
    ret["test"]="ok";
    ret["result"]="valid";
    ret["token"]=drogon::utils::getUuid();
    auto resp=HttpResponse::newHttpJsonResponse(ret);
    callback(resp);
}