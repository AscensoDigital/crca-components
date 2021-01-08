import firebase from 'firebase/app';

export const FILTRO_TYPE_BOOLEAN = 'boolean';
export const FILTRO_TYPE_ENTITY = 'entity';
export const FILTRO_TYPE_STRING = 'string';

export const ORDER_ASC = 'asc';
export const ORDER_DESC = 'desc';

export const isDefined = v => v !== undefined && v !== null && v !== '';

export const dateFirebase2Js = date => {
  if (!isDefined(date)) {
    return null;
  }
  // eslint-disable-next-line no-undef
  const timestamp = new firebase.firestore.Timestamp(
    date.seconds,
    date.nanoseconds
  );
  return timestamp.toDate();
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
      }
    }
  }
  return vw;
};

export const isObject = obj => obj !== null && typeof obj === 'object';

export const existDiffObject = (objA, objB) => {
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
