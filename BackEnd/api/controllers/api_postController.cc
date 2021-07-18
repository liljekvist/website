#include "api_postController.h"
using namespace api;
//add definition of your processing function here

void postController::makePost(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback, std::string title, std::string msg){
    LOG_DEBUG << "Title: " << title << "     Msg: " << msg;
    auto resp = HttpResponse::newRedirectionResponse("http://192.168.0.250/");
    int uid = 0;
    std::string uuid = req->getCookie("uuid");
    if (uuid.empty())
    {
        std::string uuid = drogon::utils::getUuid();
        auto date = trantor::Date(2022, 01, 01);
        Cookie c("uuid", uuid);
        c.setExpiresDate(date);
        c.setPath("http://192.168.0.250/");
        uid = helper.addUIDtoDB(uuid);
        resp->addCookie(c);
    }
    else {
        uid = helper.uidFromUuid(uuid);
    }

    auto date = trantor::Date::date();
    auto clientPtr = drogon::app().getDbClient();
    std::string dateStr = date.roundDay().toDbStringLocal();
    std::ostringstream oss1;
    oss1 << "INSERT INTO `posts`(`postid`, `uid`, `title`, `msg`, `date`) VALUES (NULL," << uid << ",'" << title << "','" << msg << "','" << dateStr << "')";
    auto q = clientPtr->execSqlAsyncFuture(oss1.str(), "default");
    try
    {
        auto result = q.get();
    }
    catch (int e)
    {
        std::cerr << "errors:" << e << std::endl;
    }
    resp->addHeader("Access-Control-Allow-Origin", "*"); //Fix för CORS
    callback(resp);
}


void postController::getPost(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback, int postid){
    Json::Value jsonArray;
    auto clientPtr = drogon::app().getDbClient();
    //använd dbHelper här. behöver ny Func för det dock
    std::ostringstream oss1;
    oss1 << "SELECT * FROM `posts` WHERE `postid` = '" << postid << "'";
    auto q = clientPtr->execSqlAsyncFuture(oss1.str(), "default");
    try
    {
        auto result = q.get();
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
    }
    catch (int e)
    {
        std::cerr << "errors:" << e << std::endl;
    }

    auto resp=HttpResponse::newHttpJsonResponse(jsonArray);
    resp->addHeader("Access-Control-Allow-Origin", "*"); //Fix för CORS
    callback(resp);
}