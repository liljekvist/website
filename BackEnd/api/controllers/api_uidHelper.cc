#include "api_uidHelper.h"

//Måste värkligen skriva om denna funktion. Funkar men är väldigt ful.
const int uidHelper::addUIDtoDB(std::string uuid){
    LOG_DEBUG << "addUIDtoDB";
    int randnumber = 0;
    bool loop = true;
    auto clientPtr = drogon::app().getDbClient();
    //Skulle vilja undvika en loop här. Kanske ett auto increment id istället för ett med random nummer då detta kan göras i mysql.
    while (loop)
    {
        randnumber = stuff.getRandInt(1, 1000000);
        int value = db.getDBResult<int, int>("users", "uid", "uid", randnumber);
        if(value == -1){
            loop = false;
            //vill göra all str formatering i dbHelper. Detta är en ful lösning.
            std::ostringstream oss1;
            oss1 << "INSERT INTO `users`(`uid`, `uuid`) VALUES (" << randnumber << ",'" << uuid << "'a)";
            db.insertToDb(oss1.str());
            return randnumber;
        }
    }
    return -1;
}

const int uidHelper::uidFromUuid(std::string uuid){
    int uid = 0;
    uid = db.getDBResult<std::string, int>("users", "uid", "uuid", uuid);
    LOG_DEBUG << "uidFromUuid         " << uid;
    return uid;
}
