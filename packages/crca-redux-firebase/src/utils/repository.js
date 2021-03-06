import { CrcaFirebaseLoader } from "../CrcaFirebaseLoader";

export const getQueryCollectionByProp = (collection, prop, value) => {
  const db = CrcaFirebaseLoader.firebase.firestore();
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
  const db = CrcaFirebaseLoader.firebase.firestore();;
  return db.collection(collection).orderBy(sortProp);
};
