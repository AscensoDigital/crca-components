import { isNull } from '@ascenso/crca-utils';
import { collection, query, where, orderBy, getFirestore } from "firebase/firestore";

import { CrcaFirebaseLoader } from "../CrcaFirebaseLoader.js";

export const getQueryCollectionByProp = (collectionName, prop, value) => {
  const firestore =  isNull(CrcaFirebaseLoader.db) ? getFirestore() : CrcaFirebaseLoader.db;
  const collectionRef = collection(firestore, collectionName);
  return query(collectionRef, where(prop, "==", value));
};

export const getQueryCollectionByPropSorted = (
  collectionName,
  prop,
  value,
  sortProp = 'sort',
  sortOrder = 'asc'
) => {
  const firestore =  isNull(CrcaFirebaseLoader.db) ? getFirestore() : CrcaFirebaseLoader.db;
  const collectionRef = collection(firestore, collectionName);
  return query(collectionRef, where(prop, "==", value), orderBy(sortProp, sortOrder));
};

export const getQueryCollectionSorted = (collectionName, sortProp = 'sort', sortOrder = 'asc') => {
  const firestore =  isNull(CrcaFirebaseLoader.db) ? getFirestore() : CrcaFirebaseLoader.db;
  const collectionRef = collection(firestore, collectionName);
  return query(collectionRef, orderBy(sortProp, sortOrder));
};
