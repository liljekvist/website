#pragma once
#include <drogon/HttpController.h>
#include <cstring>
#include "api_dbHelper.h"
#include "api_uidHelper.h"
using namespace drogon;
namespace api
{
class jsonController:public drogon::HttpController<jsonController>
{
  public:
    METHOD_LIST_BEGIN
    //use METHOD_ADD to add your custom processing function here;
    //METHOD_ADD(jsonController::get,"/{2}/{1}",Get);//path is /api/jsonController/{arg2}/{arg1}
    //METHOD_ADD(jsonController::your_method_name,"/{1}/{2}/list",Get);//path is /api/jsonController/{arg1}/{arg2}/list
    //ADD_METHOD_TO(jsonController::your_method_name,"/absolute/path/{1}/{2}/list",Get);//path is /absolute/path/{arg1}/{arg2}/list
    ADD_METHOD_TO(jsonController::getPost,"/json/post?postid={1}",Get);
    ADD_METHOD_TO(jsonController::getPosts,"/json/getPosts",Get);
    ADD_METHOD_TO(jsonController::getUidFromUuid,"/json/getUid?uuid={1}",Get);
    ADD_METHOD_TO(jsonController::getCommentsForPost,"/json/getComments?postid={1}",Get);
    ADD_METHOD_TO(jsonController::uuidInDB,"/json/uuidInDb?uuid={1}",Get);


    METHOD_LIST_END
    // your declaration of processing function maybe like this:
    // void get(const HttpRequestPtr& req,std::function<void (const HttpResponsePtr &)> &&callback,int p1,std::string p2);
    // void your_method_name(const HttpRequestPtr& req,std::function<void (const HttpResponsePtr &)> &&callback,double p1,int p2) const;
    void getPosts(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback);
    void getUidFromUuid(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, std::string uuid);
    void getCommentsForPost(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, const int postid);
    void getPost(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback, int postid);
    void uuidInDB(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback, std::string uuid);
    dbHelper db;
    uidHelper uh;
};
}
