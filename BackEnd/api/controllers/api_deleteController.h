#pragma once
#include <drogon/HttpController.h>
#include "api_uidHelper.h"
#include "api_dbHelper.h"
using namespace drogon;
namespace api
{
class deleteController:public drogon::HttpController<deleteController>
{
  public:
    METHOD_LIST_BEGIN
    //use METHOD_ADD to add your custom processing function here;
    //METHOD_ADD(deleteController::get,"/{2}/{1}",Get);//path is /api/deleteController/{arg2}/{arg1}
    //METHOD_ADD(deleteController::your_method_name,"/{1}/{2}/list",Get);//path is /api/deleteController/{arg1}/{arg2}/list
    //ADD_METHOD_TO(deleteController::your_method_name,"/absolute/path/{1}/{2}/list",Get);//path is /absolute/path/{arg1}/{arg2}/list
    ADD_METHOD_TO(deleteController::deletePost,"/delete/deletePost?postid={1}&uuid={2}",Post);

    METHOD_LIST_END
    // your declaration of processing function maybe like this:
    // void get(const HttpRequestPtr& req,std::function<void (const HttpResponsePtr &)> &&callback,int p1,std::string p2);
    // void your_method_name(const HttpRequestPtr& req,std::function<void (const HttpResponsePtr &)> &&callback,double p1,int p2) const;
    void deletePost(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, const int postid, std::string uuid);
    uidHelper uh;
    dbHelper db;
};
}
