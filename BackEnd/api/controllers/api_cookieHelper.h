#pragma once
#include <drogon/HttpController.h>
#include <drogon/Cookie.h>
#include "api_uidHelper.h"
using namespace drogon;

class cookieHelper
{
  public:
    Cookie makeUserCookie(std::string uuid){
        auto date = trantor::Date(2022, 01, 01);
        Cookie c("uuid", uuid);
        c.setSecure(true);
        c.setHttpOnly(false);
        c.setExpiresDate(date);
        c.setPath("http://192.168.0.250/");
        return c;
    }
};
