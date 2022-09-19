factorial = (Int n) => {
   if (n == 0) then
      return 1;
   else
      return n * factorial(n-1);
   end if
};

print(factorial(5));