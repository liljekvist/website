#pragma once
#include <drogon/HttpController.h>
#include "api_uidHelper.h"
#include "api_cookieHelper.h"
using namespace drogon;
namespace api
{
class postController:public drogon::HttpController<postController>
{
  public:
    METHOD_LIST_BEGIN
    //use METHOD_ADD to add your custom processing function here;
    //METHOD_ADD(postController::get,"/{2}/{1}",Get);//path is /api/postController/{arg2}/{arg1}
    //METHOD_ADD(postController::your_method_name,"/{1}/{2}/list",Get);//path is /api/postController/{arg1}/{arg2}/list
    ADD_METHOD_TO(postController::makePost,"/post?title={1}&msg={2}", Post);
    ADD_METHOD_TO(postController::makeComment,"/postComment?uid={1}&postid={2}&msg={3}", Post);
    //ADD_METHOD_TO(postController::makeVote,"/postVote?uid={1}&postid={2}&vote={3}", Post);


    METHOD_LIST_END
    // your declaration of processing function maybe like this:
    // void get(const HttpRequestPtr& req,std::function<void (const HttpResponsePtr &)> &&callback,int p1,std::string p2);
    // void your_method_name(const HttpRequestPtr& req,std::function<void (const HttpResponsePtr &)> &&callback,double p1,int p2) const;

     void makePost(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback, std::string title, std::string msg);
     void makeComment(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback, int uid, int postid, std::string msg);
     //void makeVote(const HttpRequestPtr &req, std::function<void(const HttpResponsePtr &)> &&callback, int uid, int postid, int vote);
     uidHelper helper;
     dbHelper db;
     cookieHelper ch;
};
}
