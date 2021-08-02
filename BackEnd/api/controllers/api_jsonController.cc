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

void jsonController::getCommentsForPost(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, const int postid){
    Json::Value json;
    std::ostringstream tablestr;
    tablestr << "comments_" << postid;
    auto r = db.getDBResultObj<char>(tablestr.str(), "x", 'd', true);
    int i = 0;
    int k;
    for (auto row : r)
    {
        k = i;
        Json::Value v;
        v["uid"] = row["commentuid"].as<int>();
        v["message"] = row["message"].as<std::string>();
        v["date"] = row["date"].as<std::string>();
        v["upvotes"] = row["upvotes"].as<int>();
        json[i]=v;
        i++;
    }
    auto resp=HttpResponse::newHttpJsonResponse(json);
    resp->addHeader("Access-Control-Allow-Origin", "*"); //Fix för CORS
    callback(resp);
}

void jsonController::getPost(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback, int postid){
    Json::Value jsonArray;
    auto result = db.getDBResultObj<int>("posts", "postid", postid, false);
    int i = 0;
    for (auto row : result)
    {
        jsonArray["uid"] = row["uid"].as<int>();
        jsonArray["postid"] = row["postid"].as<int>();
        jsonArray["title"] = row["title"].as<std::string>();
        jsonArray["msg"] = row["msg"].as<std::string>();
        jsonArray["date"] = row["date"].as<std::string>();
        i++;
    }
    //Kort error check då jag inte kan ta en row utan behöver loopa dom tills vidare.
    if(i > 1){
        LOG_DEBUG << "Error: Multiple rows selected.";
    }

    auto resp=HttpResponse::newHttpJsonResponse(jsonArray);
    resp->addHeader("Access-Control-Allow-Origin", "*"); //Fix för CORS
    callback(resp);
}