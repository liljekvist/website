#pragma once
#include <drogon/HttpController.h>
#include <cstring>
//#include <vector>
using namespace drogon;
namespace api
{
class main:public drogon::HttpController<main>
{
  public:
    METHOD_LIST_BEGIN
    //use METHOD_ADD to add your custom processing function here;
    //METHOD_ADD(main::get,"/{2}/{1}",Get);//path is /api/main/{arg2}/{arg1}
    //METHOD_ADD(main::your_method_name,"/{1}/{2}/list",Get);//path is /api/main/{arg1}/{arg2}/list
    ADD_METHOD_TO(main::getPosts,"/getPosts",Get);
    //ADD_METHOD_TO(main::jsonTest,"/json",Get);
    //ADD_METHOD_TO(main::jsonTest,"/json",Get);

    METHOD_LIST_END
    // your declaration of processing function maybe like this:
    // void get(const HttpRequestPtr& req,std::function<void (const HttpResponsePtr &)> &&callback,int p1,std::string p2);
    // void your_method_name(const HttpRequestPtr& req,std::function<void (const HttpResponsePtr &)> &&callback,double p1,int p2) const;
    void getPosts(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback);
    
};
}
