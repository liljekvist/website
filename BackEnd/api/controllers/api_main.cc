#include "api_main.h"
using namespace api;
//add definition of your processing function here


void main::jsonTest(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback){


    LOG_DEBUG<< "Test";
    Json::Value ret;
    Json::Value user1;
    Json::Value user2;
    Json::Value user3;
    Json::Value user4;
    Json::Value user5;
    user1["uid"]=1000;
    user1["uuid"]=drogon::utils::getUuid();

    user2["uid"]=12313;
    user2["uuid"]=drogon::utils::getUuid();

    user3["uid"]=321345;
    user3["uuid"]=drogon::utils::getUuid();

    user4["uid"]=167567;
    user4["uuid"]=drogon::utils::getUuid();

    user5["uid"]=98876;
    user5["uuid"]=drogon::utils::getUuid();


    ret["user1"]=user1;
    ret["user2"]=user2;
    ret["user3"]=user3;
    ret["user4"]=user4;
    ret["user5"]=user5;
    auto resp=HttpResponse::newHttpJsonResponse(ret);
    resp->addHeader("Access-Control-Allow-Origin", "*");
    callback(resp);
}