#include "api_uidHelper.h"


//Måste värkligen skriva om denna funktion. Funkar men är väldigt ful.
const int uidHelper::addUIDtoDB(std::string uuid){
    LOG_DEBUG << "addUIDtoDB";
    int randnumber = 0;
    bool loop = true;
    srand(time(0));
    auto clientPtr = drogon::app().getDbClient();
    while (loop)
    {
        randnumber = rand() % 999999 + 1;
        //ändra till ny func
        std::ostringstream oss;
        oss << "SELECT * FROM `users` WHERE `uid` = " << randnumber;
        auto f = clientPtr->execSqlAsyncFuture(oss.str(), "default");
        try
        {
            auto r = f.get();
            if (r.size() == 0)
            {
                loop = false;
                std::ostringstream oss1;
                oss1 << "INSERT INTO `users`(`uid`, `uuid`) VALUES (" << randnumber << ",'" << uuid << "')";
                auto q = clientPtr->execSqlAsyncFuture(oss1.str(),
                                                       "default");
                try
                {
                    auto r2 = q.get();
                }
                catch (int e)
                {
                    std::cerr << "errors:" << e << std::endl;
                }
            }
        }
        catch (int e)
        {
            std::cerr << "errors:" << e << std::endl;
        }
    }
    return randnumber;
}

const int uidHelper::uidFromUuid(std::string uuid){
    LOG_DEBUG << "uidFromUuid";
    int uid = 0;
    auto clientPtr = drogon::app().getDbClient();
    std::ostringstream oss1;
    oss1 << "SELECT `uid` FROM `users` WHERE `uuid` = '" << uuid << "'";
    auto q = clientPtr->execSqlAsyncFuture(oss1.str(), "default");
    try
    {
        //NTS: Skriv om denna query utn en for loop
        auto result = q.get();
        int i = 0;
        for (auto row : result)
        {
            uid = row["uid"].as<int>();
            i++;
        }
    }
    catch (int e)
    {
        std::cerr << "errors:" << e << std::endl;
    }
    return uid;
}
