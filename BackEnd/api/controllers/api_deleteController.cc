#include "api_deleteController.h"
using namespace api;
//add definition of your processing function here
void deleteController::deletePost(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, const int postid, std::string uuid){
    //delete grejer här samt en uuid check så de är rätt användare

    

    Json::Value ret;
    if(uh.uuidExists(uuid)){
        auto uid = uh.uidFromUuid(uuid);
        if(db.deletePost(postid, uid)){
            //borttagning lyckades
            ret["frick"] = "Fan va fint att de funkar!";
        }
        else{
            //fel uid
            ret["error"] = "UUID does not match post uid!";
        }
    }
    else{
        //uuid finns inte
        ret["error"] = "UUID does not exist in database!";
    }
    auto resp=HttpResponse::newHttpJsonResponse(ret);
    resp->addHeader("Access-Control-Allow-Origin", "https://192.168.0.250"); //Fix för CORS
    resp->addHeader("Access-Control-Allow-Methods", "DELETE");
    resp->addHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
    callback(resp);
}
