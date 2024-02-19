function ucFirst(str) {
  return (str === '') ? '' : str[0].toUpperCase() + str.slice(1);
}

console.log(ucFirst(''));
console.log(ucFirst('и'));
console.log(ucFirst('илья'));
