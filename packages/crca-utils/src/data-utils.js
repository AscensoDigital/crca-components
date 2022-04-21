export const FILTRO_TYPE_BOOLEAN = 'boolean';
export const FILTRO_TYPE_ENTITY = 'entity';
export const FILTRO_TYPE_STRING = 'string';

export const ORDER_ASC = 'asc';
export const ORDER_DESC = 'desc';


export const isDefined = v => v !== undefined && v !== null && v !== '';

export const decodeField = value => {
  if (typeof value === 'string') {
    const tmp = value.split('_');
    return tmp[tmp.length - 1];
  }

  return value;
};

export const joinParts = (obj, struct) => {
  if (
    typeof struct === 'object' &&
    struct.charJoin !== undefined &&
    struct.parts !== undefined
  ) {
    const parts = [];
    struct.parts.forEach(key => {
      if (obj[key] !== undefined) {
        if (typeof key === 'function') {
          parts.push(key(obj));
        } else {
          parts.push(obj[key]);
        }
      }
    });
    return parts.join(struct.charJoin);
  }
  return null;
};

const getPropProfunda = (obj, path) => {
  const parts = path.split('.');
  if(isObject(obj)) {
    const part = parts.shift();
    if(isDefined(obj[part])) {
      if(isObject(obj[part]) && parts.length>=1) {
        return getPropProfunda(obj[part], parts.join('.'));
      }
      else if(parts.length>=1){
        return undefined;
      }
      return obj[part];
    }
  }
  return undefined;
};

export const dataViewGenerate = (obj, struct) => {
  const vw = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in struct) {
    // eslint-disable-next-line no-prototype-builtins
    if (struct.hasOwnProperty(key)) {
      const prop = struct[key];
      if (typeof prop === 'function') {
        vw[key] = prop(obj);
      } else if (
        typeof prop === 'object' &&
        prop.charJoin !== undefined &&
        prop.parts !== undefined
      ) {
        vw[key] = joinParts(obj, prop);
      } else if (
        typeof prop === 'object' &&
        prop.prop !== undefined &&
        prop.default !== undefined
      ) {
        vw[key] = obj[prop.prop] !== undefined ? obj[prop.prop] : prop.default;
      } else if (obj[prop] !== undefined) {
        vw[key] = obj[prop];
      } else if( prop.split('.').length > 1) {
        const tmp = getPropProfunda(obj, prop);
        if(tmp!==undefined) {
          vw[key] = tmp;
        }
      }
    }
  }
  return vw;
};

export const isBoolean = b => typeof b === 'boolean';
export const isFunction = f => typeof f === 'function';
export const isNumber = num => typeof num === 'number';
export const isNull = n => n === null;
export const isObject = obj => obj !== null && typeof obj === 'object';
export const isString = str => typeof str === 'string';
export const isUndefined = und => typeof und === 'undefined';

export const dataViewGet = (obj, prop, defaultValue = false) => {
  if (!isObject(obj) || !isString(prop)) {
    return defaultValue;
  }
  const parts = prop.split('.');
  let ref = obj;
  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    if (!isDefined(ref[part])) {
      return defaultValue;
    }
    ref = ref[part];
  }
  return ref;
};

export const existDiffObject = (objA, objB) => {
  if(!(isObject(objA) && isObject(objB))) {
    return true;
  }

  if(Object.keys(objA).length!==Object.keys(objB).length) {
    return true;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const prop in objA) {
    if (isObject(objA[prop]) && objB[prop] !== undefined) {
      if (existDiffObject(objA[prop], objB[prop])) {
        return true;
      }
    } else if (objB === undefined || objB[prop] !== objA[prop]) {
      return true;
    }
  }
  return false;
};

const filtrar = (p, key, filtro) => {
  // console.log(p,key,filtro);
  switch (filtro.type) {
    case FILTRO_TYPE_STRING:
      return (
        p[key] !== undefined &&
        p[key] !== null &&
        p[key].toLowerCase().indexOf(filtro.value.toLowerCase()) !== -1
      );
    case FILTRO_TYPE_BOOLEAN:
      return (
        p[key] !== undefined &&
        p[key] !== null &&
        (Number(p[key]) === Number(filtro.value) ||
          (Number(filtro.value) === 1 && Number(p[key]) >= 1))
      );
    default:
      // console.log(filtro.value, p[key]);
      return p[key][filtro.value] !== undefined;
  }
};

const ordenar = (a, b, order) => {
  if(!isDefined(a[order.field]) && !isDefined(b[order.field])) {
    return 0;
  }
  if(!isDefined(a[order.field])) {
    return 1;
  }
  if(!isDefined(b[order.field])) {
    return -1;
  }
  if (
    (order.order === ORDER_ASC && a[order.field] < b[order.field]) ||
    (order.order === ORDER_DESC && a[order.field] > b[order.field])
  ) {
    return -1;
  }
  if (
    (order.order === ORDER_ASC && a[order.field] > b[order.field]) ||
    (order.order === ORDER_DESC && a[order.field] < b[order.field])
  ) {
    return 1;
  }
  return 0;
};

export const filterData = (docs, filters) => {
  let tmp = [...docs];
  // eslint-disable-next-line no-restricted-syntax
  for (const key in filters) {
    // eslint-disable-next-line no-prototype-builtins
    if (filters.hasOwnProperty(key)) {
      const filtro = filters[key];
      tmp = tmp.filter(p => filtrar(p, key, filtro));
    }
  }
  return tmp;
};

export const sortData = (docs, order) => {
  return order !== null ? docs.sort((a, b) => ordenar(a, b, order)) : docs;
};

export const filterAndSortData = (docs, order, filters) =>
  sortData(filterData(docs, filters), order);

export const stringifyPropValue = obj => {
  if (!isObject(obj)) {
    return false;
  }

  const objRet = {};
  Object.keys(obj).forEach(prop => {
    objRet[prop] =
      (isObject(obj[prop]) && JSON.stringify(obj[prop])) || obj[prop];
  });
  return objRet;
};

export const sanitizeHTML = (text)  => {
  const element = document.createElement('div');
  element.innerText = text;
  return element.innerHTML;
}

export const slugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-')
    // Collapse dashes
    .replace(/-+/g, '-');

    return str;
}