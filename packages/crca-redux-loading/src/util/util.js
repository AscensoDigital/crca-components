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

export const CRCA_LOADING_TYPE_INTERNAL = 'internal';
export const CRCA_LOADING_TYPE_ELEMENT = 'element';
export const CRCA_LOADING_TYPE_PAGE = 'page';