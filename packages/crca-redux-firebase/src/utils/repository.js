import 'firebase/firestore';
import { crcaFirebaseGet } from '../redux/actions.js';

export const getQueryCollectionByProp = (collection, prop, value) => {
  const db = crcaFirebaseGet().firestore();
  return db.collection(collection).where(prop, '==', value);
};

export const getQueryCollectionByPropSorted = (
  collection,
  prop,
  value,
  sortProp = 'sort'
) => {
  return getQueryCollectionByProp(collection, prop, value).orderBy(sortProp);
};

export const getQueryCollectionSorted = (collection, sortProp = 'sort') => {
  const db = crcaFirebaseGet().firestore();
  return db.collection(collection).orderBy(sortProp);
};
