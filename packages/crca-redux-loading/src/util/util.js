export const generateProcessTag = (process, vars) => {
  let arr;
  if(vars===undefined) {
    arr = [];
  }
  else {
    arr = Array.isArray(vars) ? vars : [vars];
  }
  return [process, ...arr].join(" ");
}