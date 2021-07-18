#pragma once
#include <drogon/HttpController.h>

#include <drogon/HttpRequest.h>

#include <drogon/HttpClient.h>

#include <trantor/net/EventLoopThread.h>

#include <type_traits>

#include <vector>

//Macros
//using MultiType = variant<int, std::string, float>; 

class dbHelper {
  public:
    //Gets a value from database. Returns empty string or -1 depending on value type.
    template < typename T, typename V >
    const V getDBResult(std::string table, std::string column, std::string key, T getValue) {
      auto clientPtr = drogon::app().getDbClient();
      V returnValue;
      std::ostringstream query;
      if (std::is_same < T, std::string > ::value) {
        query << "SELECT `" << column << "` FROM `" << table << "` WHERE `" << key << "` = '" << getValue << "'";
      } else {
        query << "SELECT `" << column << "` FROM `" << table << "` WHERE `" << key << "` = " << getValue;
      }
      if (!std::is_same < V, std::string > ::value) {
        //Fix för konstigt beteenede
        //kan ge errors om man använder konstiga datatyper
        returnValue = -1;
      }
      LOG_DEBUG << query.str();
      auto q = clientPtr -> execSqlAsyncFuture(query.str(), "default");
      try {
        auto result = q.get();
        int i = 0;
        for (auto row: result) {
          returnValue = row[column].as < V > ();
          i++;
        }
      } catch (int e) {
        std::cerr << "errors:" << e << std::endl;
      }
      return returnValue;
    }

  void insertToDb(std::string query) {
    auto clientPtr = drogon::app().getDbClient();
    auto q = clientPtr -> execSqlAsyncFuture(query, "default");
    try {
      auto r2 = q.get();
    } catch (int e) {
      std::cerr << "errors:" << e << std::endl;
    }
  }

  //Mycket mer preformence snällt att använda detta sätt men också mer kod att kladda med.
  //template <> const std::string getDBResult<std::string>(std::string table, std::string column, std::string key, std::string value);
};