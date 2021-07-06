#pragma once
#include <drogon/HttpController.h>
#include <drogon/HttpRequest.h>
#include <drogon/HttpClient.h>
#include <trantor/net/EventLoopThread.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

class uidHelper
{
  public:
    const int addUIDtoDB(std::string uuid);
    const int uidFromUuid(std::string uuid);
};