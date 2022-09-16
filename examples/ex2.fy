myFunction = (Int a, Int b, Int c) => {
    sum : Int is a + b;
    sum1 : Int is sum + c;
    return sum1;
};
print(myFunction(4,3,5));