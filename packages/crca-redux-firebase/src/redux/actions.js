// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/remote-config';

import { crcaUrlIsHostProdSelector, crcaUrlEnvSelector } from '@ascenso/crca-redux-url-parser/redux';
import {
  isNull,
  isObject,
  stringifyPropValue,
} from '@ascenso/crca-utils';
// import { negativeFeedback } from '@ascenso/crca-redux-feedback/redux';
import { sendErrorDiscord } from '@ascenso/crca-utils';

import {
  crcaFirebaseAuthSignInSelector,
  crcaFirebaseConfigDevSelector,
  crcaFirebaseConfigProdSelector,
  crcaFirebaseInitSelector,
  crcaFirebaseDiscordUrlSelector
} from './selectors.js';

import {
  FB_AUTH_ANONYMOUSLY,
  FB_RC_TYPE_VALUE_BOOLEAN,
  FB_RC_TYPE_VALUE_NUMBER,
  FB_RC_TYPE_VALUE_OBJECT,
  FB_RC_TYPE_VALUE_STRING,
  FB_RC_TYPE_VALUE_VALUE
} from '../consts.js';
import { CrcaFirebaseLoader } from '../CrcaFirebaseLoader.js';

export const SET_FIREBASE_DISCORD_URL = 'SET_FIREBASE_DISCORD_URL';
export const SET_REMOTE_CONFIG = 'SET_REMOTE_CONFIG';
export const SET_FIREBASE_CONFIG_DEV = 'SET_FIREBASE_CONFIG_DEV';
export const SET_FIREBASE_CONFIG_PROD = 'SET_FIREBASE_CONFIG_PROD';
export const SET_FIREBASE_AUTH_METHODS = 'SET_FIREBASE_AUTH_METHODS';
export const SUCCESS_FIREBASE = 'SUCCESS_FIREBASE';
export const SUCCESS_FIREBASE_SIGN_IN = "SUCCESS_FIREBASE_SIGN_IN";
export const SUCCESS_REMOTE_CONFIG = 'SUCCESS_REMOTE_CONFIG';
export const UPDATE_FIREBASE_USER = 'UPDATE_FIREBASE_USER'
export const UPDATE_LAST_FETCH = 'UPDATE_LAST_FETCH';
export const LOGOUT_FIREBASE = 'LOGOUT_FIREBASE';

const _logoutFirebase = () => ({
  type: LOGOUT_FIREBASE
});

const setRemoteConfig = config => ({
  type: SET_REMOTE_CONFIG,
  config,
});

const successFirebase = () => ({
  type: SUCCESS_FIREBASE,
});

const successRemoteConfig = () => ({
  type: SUCCESS_REMOTE_CONFIG,
});

const updateFirebaseUser = user => ({
  type: UPDATE_FIREBASE_USER,
  user
});

const sendError = (state, tag, err, data = {})  => {
  const discordUrl = crcaFirebaseDiscordUrlSelector(state);
  if(discordUrl!==''){
    const dat = {
      location: window.location,
      userAgent: window.navigator.userAgent,
      info: {
        ...data
      }
    }
    sendErrorDiscord(discordUrl,err,dat,tag);
  }
}

export const updateLastFetch = lastFetch => ({
  type: UPDATE_LAST_FETCH,
  lastFetch,
});

export const setFirebaseAuthMethods = methods => ({
  type: SET_FIREBASE_AUTH_METHODS,
  methods
});

export const setFirebaseConfigDev = (config, useAsProd = false) => ({
  type: SET_FIREBASE_CONFIG_DEV,
  configDev: {
    config,
    useAsProd,
  },
});

export const setFirebaseConfigProd = (config, useAsDev = false) => ({
  type: SET_FIREBASE_CONFIG_PROD,
  configProd: {
    config,
    useAsDev,
  },
});

export const setFirebaseDiscordUrl = discordUrl => ({
  type: SET_FIREBASE_DISCORD_URL,
  discordUrl,
});

export const successFirebaseSignIn = signInMethod => ({
  type: SUCCESS_FIREBASE_SIGN_IN,
  signInMethod
});

CrcaFirebaseLoader.firebase = firebase;

export const crcaFirebaseGet = () => CrcaFirebaseLoader.firebase;

export const crcaFirebaseAnalyticsLogEvent = (event, payload = null) => (getState) => {
  const state = getState();

  // eslint-disable-next-line no-undef
  if(!isObject(analytics)) {
    sendError(state,'crcaFirebaseAnalyticsLogEvent',{ error: 'Analytics no inicializado'});
    // dispatch(negativeFeedback('Analytics no inicializado'));
    return;
  }

  if(crcaFirebaseInitSelector(state)) {
    try {
      if(isNull(payload)) {
        // eslint-disable-next-line no-undef
        analytics.logEvent(event);
      }
      else {
        // eslint-disable-next-line no-undef
        analytics.logEvent(event, payload);
      }
    } catch (error) {
      sendError(state,'crcaFirebaseAnalyticsLogEvent-catch',error, {event, payload});
    }
  }
  else {
    sendError(state,'crcaFirebaseAnalyticsLogEvent',{ error: 'Analytics Event sin firebase inicializado'});
    // dispatch(negativeFeedback('Analytics Event sin firebase inicializado'));
  }
}

export const firebaseAuthStateChanged = () => (dispatch) => {
  CrcaFirebaseLoader.firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      dispatch(updateFirebaseUser(user));
    } else {
      dispatch(_logoutFirebase());
    }
  });
};

export const firebaseInitializeApp = (enabledAnalytics = true) => (
  dispatch,
  getState
) => {
  const state = getState();
  const isDominioProd = crcaUrlIsHostProdSelector(state);
  try {
    let config = null;
    if (isDominioProd) {
      const configProd = crcaFirebaseConfigProdSelector(state);
      if (isNull(configProd.config)) {
        if (!configProd.useAsDev) {
          console.warn(
            'Firebase Config: Entorno de Producción cargará configuración de desarrollo.'
          );
        }
        const configDev = crcaFirebaseConfigDevSelector(state);
        if (!isNull(configDev.config)) {
          config = configDev.config;
        }
      } else {
        config = configProd.config;
      }
    } else {
      const configDev = crcaFirebaseConfigDevSelector(state);
      if (isNull(configDev.config)) {
        if (!configDev.useAsProd) {
          console.warn(
            'Firebase Config: Entorno de Desarrollo cargará configuración de producción.'
          );
        }
        const configProd = crcaFirebaseConfigProdSelector(state);
        if (!isNull(configProd.config)) {
          config = configProd.config;
        }
      } else {
        config = configDev.config;
      }
    }

    if (isNull(config)) {
      console.err('No hay configuración de Firebase seteada');
      return;
    }

    CrcaFirebaseLoader.firebase.initializeApp(config);
    dispatch(successFirebase(config));

    if (enabledAnalytics && CrcaFirebaseLoader.firebase.analytics.isSupported()) {
      CrcaFirebaseLoader.firebase.analytics();
    }
  } catch (error) {
    sendError(state,'firebaseInitializeApp-catch',error,{enabledAnalytics, isDominioProd})
  }
};

export const firebaseRemoteConfigActivate = () => (dispatch, getState) => {
  const state = getState();
  CrcaFirebaseLoader.remoteConfig
    .activate()
    .then(() => {
      dispatch(setRemoteConfig(CrcaFirebaseLoader.remoteConfig.getAll()));
    })
    .catch(e => sendError(state, 'firebaseRemoteConfigActive-catch', e, {msg:'RemoteConfig: activate fail'}));
};

export const firebaseRemoteConfigFetch = () => (dispatch, getState) => {
  const state = getState();
  CrcaFirebaseLoader.remoteConfig
    .fetch()
    .then(() => {
      dispatch(updateLastFetch(new Date()));
    })
    .catch(e => sendError(state, 'firebaseRemoteConfigFetch-catch', e, {msg:'RemoteConfig: fetch fail'}));
};

export const firebaseRemoteConfigFetchAndActivate = () => (dispatch, getState) => {
  const state = getState();
  CrcaFirebaseLoader.remoteConfig
    .fetchAndActivate()
    .then( () => {
      dispatch(setRemoteConfig(CrcaFirebaseLoader.remoteConfig.getAll()));
    })
    .catch(e => sendError(state, 'firebaseRemoteConfigFetchAndActivate-catch', e, {msg:'RemoteConfig: fetchAndActivate fail'}));
};

export const firebaseRemoteConfigLoadDefault = defaultConfig => (
  dispatch,
  getState
) => {
  const state = getState();
  const isDominioProd = crcaUrlIsHostProdSelector(state);
  const initFirebase = crcaFirebaseInitSelector(state);

  if (initFirebase) {
    try {
      CrcaFirebaseLoader.remoteConfig = CrcaFirebaseLoader.firebase.remoteConfig();
      if (!isDominioProd) {
        CrcaFirebaseLoader.remoteConfig.settings = {
          minimumFetchIntervalMillis: 300000,
        };
      }

      CrcaFirebaseLoader.remoteConfig.defaultConfig = stringifyPropValue(defaultConfig) || {};

      dispatch(successRemoteConfig());
    }
    catch(err) {
      sendError(state, 'firebaseRemoteConfigLoadDefault-catch', err);
    }
  } else {
    sendError(state, 'firebaseRemoteConfigLoadDefault', { error: 'No se ha inizializado Firebase'});
  }
};

export const firebaseSignInAnonymously = () => (dispatch, getState) => {
  const state = getState();
  const signIn = crcaFirebaseAuthSignInSelector(state);

  if(!signIn){
    CrcaFirebaseLoader.firebase.auth().signInAnonymously()
    .then(() => {
      dispatch(successFirebaseSignIn(FB_AUTH_ANONYMOUSLY));
    })
    .catch(error => {
      sendError(state, 'firebaseSignInAnonymously-catch', error, {signIn});
      /* const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Firebase SignIn Error ${errorCode}: ${errorMessage}`); */
    });
  }
};

export const crcaFirebaseRemoteConfigGet = (
  key,
  typeValue = FB_RC_TYPE_VALUE_VALUE
) => {
  if(isNull(CrcaFirebaseLoader.remoteConfig)) {
    console.log('No se a inicializado remoteConfig');
    return false;
  }
  switch (typeValue) {
    case FB_RC_TYPE_VALUE_BOOLEAN:
      return CrcaFirebaseLoader.remoteConfig.getBoolean(key);
    case FB_RC_TYPE_VALUE_NUMBER:
      return CrcaFirebaseLoader.remoteConfig.getNumber(key);
    case FB_RC_TYPE_VALUE_STRING:
      return CrcaFirebaseLoader.remoteConfig.getString(key);
    case FB_RC_TYPE_VALUE_OBJECT:
      return (
        (isObject(CrcaFirebaseLoader.remoteConfig.getValue(key)._value) &&
        CrcaFirebaseLoader.remoteConfig.getValue(key)._value) ||
        JSON.parse(CrcaFirebaseLoader.remoteConfig.getString(key)) ||
        {}
      );
    default:
      return CrcaFirebaseLoader.remoteConfig.getValue(key);
  }
};

export const crcaFirebaseRemoteConfigGetAll = () => {
  if(isNull(CrcaFirebaseLoader.remoteConfig)) {
    console.log('No se a inicializado remoteConfig');
    return false;
  }
  return CrcaFirebaseLoader.remoteConfig.getAll();
};
