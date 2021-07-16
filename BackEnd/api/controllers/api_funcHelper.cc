#include "api_funcHelper.h"
const int funcHelper::getRandInt(const int min, const int max){
    //dåligt att reseeda rand varje gång man callar randint
    srand(time(0));
    int number = rand() % (max - min + 1) + min;
    return number;
}
