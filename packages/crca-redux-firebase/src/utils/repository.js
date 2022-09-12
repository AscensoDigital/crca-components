import { isNull } from '@ascenso/crca-utils';
import { collection, query, where, orderBy } from "firebase/firestore";

import { CrcaFirebaseLoader } from "../CrcaFirebaseLoader.js";

export const getQueryCollectionByProp = (collectionName, prop, value) => {
  if(!isNull(CrcaFirebaseLoader.db)) {
    return false;
  }
  const collectionRef = collection(CrcaFirebaseLoader.db, collectionName);
  return query(collectionRef, where(prop, "==", value));
};

export const getQueryCollectionByPropSorted = (
  collectionName,
  prop,
  value,
  sortProp = 'sort',
  sortOrder = 'asc'
) => {
  const collectionRef = collection(CrcaFirebaseLoader.db, collectionName);
  return query(collectionRef, where(prop, "==", value), orderBy(sortProp, sortOrder));
};

export const getQueryCollectionSorted = (collectionName, sortProp = 'sort', sortOrder = 'asc') => {
  const collectionRef = collection(CrcaFirebaseLoader.db, collectionName);
  return query(collectionRef, orderBy(sortProp, sortOrder));
};
