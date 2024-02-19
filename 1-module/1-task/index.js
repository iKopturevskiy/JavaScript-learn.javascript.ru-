function factorial(n) {

  if (n === 0) {
    return 1;
  }

  for (let i = n - 1; i >= 1; i--) {
    n *= i;
  }

  console.log(n);
  return n;
}

factorial(5);
