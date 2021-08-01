#include "api_jsonController.h"
using namespace api;
//add definition of your processing function here

void jsonController::getPosts(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback){
    Json::Value ret;
    auto r = db.getDBResultObj<char>("posts", "NULL", 't', true);
    int i = 0;
    int k;
    for (auto row : r)
    {
        k = i; //Why dose this work - Valve
        Json::Value k;
        k["uid"] = row["uid"].as<int>();
        k["postid"] = row["postid"].as<int>();
        k["title"] = row["title"].as<std::string>();
        k["date"] = row["date"].as<std::string>();
        ret[i]=k;
        i++;
    }
    auto resp=HttpResponse::newHttpJsonResponse(ret);
    resp->addHeader("Access-Control-Allow-Origin", "*"); //Fix för CORS
    callback(resp);
}

void jsonController::getUidFromUuid(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, std::string uuid){
    Json::Value json;
    auto uid = uh.uidFromUuid(uuid);
    json["uid"] = uid;
    json["uuid"] = uuid;
    auto resp=HttpResponse::newHttpJsonResponse(json);
    resp->addHeader("Access-Control-Allow-Origin", "*"); //Fix för CORS
    callback(resp);
}