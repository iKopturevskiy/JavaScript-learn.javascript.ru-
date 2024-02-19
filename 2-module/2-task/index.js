function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

let schedule = {};

alert(isEmpty(schedule)); // true

schedule["8:30"] = "подъём";

alert(isEmpty(schedule)); // false
