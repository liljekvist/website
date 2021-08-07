#pragma once
#include <drogon/HttpController.h>
#include <drogon/HttpRequest.h>
#include <drogon/HttpClient.h>
#include <trantor/net/EventLoopThread.h>
#include "api_funcHelper.h"
#include "api_dbHelper.h"


class uidHelper
{
  public:
    const int addUIDtoDB(std::string uuid);
    const int uidFromUuid(std::string uuid);
    const bool uuidExists(std::string uuid);
    funcHelper stuff;
    dbHelper db;
};