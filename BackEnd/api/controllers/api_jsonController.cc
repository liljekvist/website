#include "api_jsonController.h"
using namespace api;
//add definition of your processing function here

void jsonController::getPosts(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback){
    Json::Value ret;
    auto clientPtr = drogon::app().getDbClient();
    auto f = clientPtr->execSqlAsyncFuture("SELECT * FROM `posts` WHERE 1","default");
    try
        {
            auto r = f.get(); // Block until we get the result or catch the exception.
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
        }
        catch (int e)
        {
            std::cerr << "Errors:" << e << std::endl;
        }

    auto resp=HttpResponse::newHttpJsonResponse(ret);
    resp->addHeader("Access-Control-Allow-Origin", "*"); //Fix för CORS
    callback(resp);
}