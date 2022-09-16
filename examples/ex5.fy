fibo = (Int n) => {
   if (n <= 2) then
       return n - 1;
   else
       return fibo(n - 1) + fibo(n - 2);
   end if
};

print(fibo(10));