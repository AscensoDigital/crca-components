import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

import {
  FB_AUTH_ANONYMOUSLY,
} from '../../consts.js';

import { crcaFirebaseAuthSignInSelector } from '../selectors/auth-selectors.js';
import { sendError } from './app-actions.js';

import { CrcaFirebaseLoader } from '../../CrcaFirebaseLoader.js';

export const SET_FIREBASE_AUTH_METHODS = 'SET_FIREBASE_AUTH_METHODS';
export const SUCCESS_FIREBASE_SIGN_IN = "SUCCESS_FIREBASE_SIGN_IN";
export const UPDATE_FIREBASE_USER = 'UPDATE_FIREBASE_USER'
export const LOGOUT_FIREBASE = 'LOGOUT_FIREBASE';

const _logoutFirebase = () => ({
  type: LOGOUT_FIREBASE
});

const updateFirebaseUser = user => ({
  type: UPDATE_FIREBASE_USER,
  user
});

export const setFirebaseAuthMethods = methods => ({
  type: SET_FIREBASE_AUTH_METHODS,
  methods
});

export const successFirebaseSignIn = signInMethod => ({
  type: SUCCESS_FIREBASE_SIGN_IN,
  signInMethod
});

export const firebaseAuthStateChanged = () => (dispatch) => {
  onAuthStateChanged(CrcaFirebaseLoader.auth, (user) => {
    if (user) {
      dispatch(updateFirebaseUser(user));
    } else {
      dispatch(_logoutFirebase());
    }
  });
};

export const firebaseSignInAnonymously = () => (dispatch, getState) => {
  const state = getState();
  const signIn = crcaFirebaseAuthSignInSelector(state);

  if(!signIn){
    CrcaFirebaseLoader.auth = getAuth(CrcaFirebaseLoader.firebase);
    signInAnonymously(CrcaFirebaseLoader.auth)
    .then(() => {
      dispatch(successFirebaseSignIn(FB_AUTH_ANONYMOUSLY));
    })
    .catch(error => {
      sendError(state, 'firebaseSignInAnonymously-catch', error, {signIn});
    });
  }
};