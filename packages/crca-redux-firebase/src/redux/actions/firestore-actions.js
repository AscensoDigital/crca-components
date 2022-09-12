import { getFirestore } from "firebase/firestore"

import { CrcaFirebaseLoader } from "../../CrcaFirebaseLoader.js";

import { crcaFirebaseInitSelector } from "../selectors/app-selectors.js";

export const SUCCESS_FIRESTORE = 'SUCCESS_FIRESTORE';

const successFirestore = () => ({
  type: SUCCESS_FIRESTORE
});

export const firestoreInitialize = () => (dispatch, getState) => {
  const state = getState();
  const initFirebase = crcaFirebaseInitSelector(state);
  if(initFirebase) {
    CrcaFirebaseLoader.db = getFirestore(CrcaFirebaseLoader.firebase);
    dispatch(successFirestore());
  }
}