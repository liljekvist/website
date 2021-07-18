#pragma once
#include <stdlib.h>
#include <time.h>

class funcHelper
{
  public:
    const int getRandInt(const int min, const int max){
    //dåligt att reseeda rand varje gång man callar randint
      srand(time(0));
      int number = rand() % (max - min + 1) + min;
      return number;
    }
};
