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
        //c.setSecure(true);
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
    std::string dateStr = date.roundSecond().toDbStringLocal();
    std::ostringstream oss1;
    //egen funktion i dbhelper för detta 
    oss1 << "INSERT INTO `posts`(`postid`, `uid`, `title`, `msg`, `date`) VALUES (NULL," << uid << ",'" << title << "','" << msg << "','" << dateStr << "')";
    //LOG_DEBUG << oss1.str();
    db.insertToDb(oss1.str());
    db.makeNewTableForPost(db.getDBResult<int, int>("posts", "postid", "uid", uid));
    resp->addHeader("Access-Control-Allow-Origin", "*"); //Fix för CORS
    callback(resp);
}

void postController::makeComment(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback, int uid, int postid, std::string msg){
    auto resp = HttpResponse::newRedirectionResponse("http://192.168.0.250/");
    auto date = trantor::Date::date();
    auto clientPtr = drogon::app().getDbClient();
    std::string dateStr = date.roundSecond().toDbStringLocal();
    std::ostringstream oss1;
    oss1 << "INSERT INTO `comments_" << postid << "`(`id`, `commentuid`, `message`, `date`, `upvotes`) VALUES (NULL," << uid << ",'" << msg << "','" << dateStr << "',0)";
    db.insertToDb(oss1.str());
    resp->addHeader("Access-Control-Allow-Origin", "*"); //Fix för CORS
    callback(resp);
}

/*void postController::makeVote(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback, int uid, int postid, int vote){
    auto resp = HttpResponse::newRedirectionResponse("http://192.168.0.250/");
    auto date = trantor::Date::date();
    auto clientPtr = drogon::app().getDbClient();
    std::string dateStr = date.roundSecond().toDbStringLocal();
    std::ostringstream oss1;
    oss1 << "INSERT INTO `comments_" << postid << "`(`id`, `commentuid`, `message`, `date`, `upvotes`) VALUES (NULL," << uid << ",'" << msg << "','" << dateStr << "',0)";
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
}*/