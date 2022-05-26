def myFunction(Int a, Int b) - > Int = {
  sum : Int is a + b;
	return sum;
}

sum : Int is 0;

while sum < 10 loop
  print ("Hello World");
	sum : sum + 1;
end loop

result : Bool is myNewVariable > mySecondVariable;

mySecondVariable : Int is 5;
sum : Int is myNewVariable + mySecondVariable;
