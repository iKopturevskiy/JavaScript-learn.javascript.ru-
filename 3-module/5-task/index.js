function getMinMax(str) {

  let arr = str
    .split(' ')
    .filter(Number)
    .sort((a, b) => a - b);

  return {
    min: +arr[0],
    max: +arr[arr.length - 1]
  };
}
