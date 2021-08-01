#pragma once
#include <drogon/HttpController.h>

#include <drogon/HttpRequest.h>

#include <drogon/HttpClient.h>

#include <trantor/net/EventLoopThread.h>

#include <type_traits>

#include <vector>

//Macros (old)
//using MultiType = variant<int, std::string, float>; 

class dbHelper {
  public:
    //Gets a value from database. Returns empty string or -1 depending on value type.

    template < typename T, typename V > const V getDBResult(std::string table, std::string column, std::string key, T getValue) {
      auto clientPtr = drogon::app().getDbClient();
      V returnValue;
      std::ostringstream query;
      //Kan nog snyggas till lite då detta är dålig pracc. Vet dock inte hur man kan göra annorlunda men får titta på de.
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
        for (auto row : result) {
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

  //NTS: Använd denna funktion istället för att checka med getDBResult.
  //const bool existsInTable(std::string table, std::string column, std::string value){
  //
  //}

    template < typename T > const drogon::orm::Result getDBResultObj(std::string table, std::string key, T getValue, bool getAllValues){
    auto clientPtr = drogon::app().getDbClient();
    std::ostringstream query;
    //Kan nog snyggas till lite då detta är dålig pracc. Vet dock inte hur man kan göra annorlunda men får titta på de.
    if (std::is_same < T, std::string > ::value) {
      query << "SELECT * FROM `" << table << "` WHERE `" << key << "` = '" << getValue << "'";
    } 
    else if(getAllValues == true){
      query << "SELECT * FROM `" << table << "` WHERE " << "1";
    }
    else {
      query << "SELECT * FROM `" << table << "` WHERE `" << key << "` = " << getValue;
    }

    auto f = clientPtr->execSqlAsyncFuture(query.str(),"default");
    try
      {
          auto r = f.get();
          return r;
      }
      catch (int e)
      {
          std::cerr << "Errors:" << e << std::endl;
      }
      //Måste Returna något men onödingt att skapa ett tomt result obj för det. Annan lösning måste finnas.
  }

//CREATE TABLE post_X (id INT NOT NULL AUTO_INCREMENT, commentuid INT, message LONGTEXT, upvotes INT, PRIMARY KEY (id));
  void makeNewTableForPost(const int postid){
    auto clientPtr = drogon::app().getDbClient();
    std::ostringstream ossthing;
    ossthing << "CREATE TABLE comments_" << postid << " (id INT NOT NULL AUTO_INCREMENT, commentuid INT, message LONGTEXT, date TEXT(255), upvotes INT, PRIMARY KEY (id));";
    auto f = clientPtr->execSqlAsyncFuture(ossthing.str(),"default");
      try
      {
          auto r = f.get();
      }
      catch (int e)
      {
          std::cerr << "Errors:" << e << std::endl;
      }
  }

  //Mycket mer preformence snällt att använda detta sätt men också mer kod att kladda med.
  //template <> const std::string getDBResult<std::string>(std::string table, std::string column, std::string key, std::string value);
};