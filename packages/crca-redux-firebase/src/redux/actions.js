// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/remote-config';

import { crcaUrlIsDominioProdSelector } from '@ascenso/crca-redux-url-parser';
import {
  crcaFirebaseConfigDevSelector,
  crcaFirebaseConfigProdSelector,
  crcaFirebaseInitSelector,
} from './selectors.js';
import {
  TYPE_VALUE_BOOLEAN,
  TYPE_VALUE_NUMBER,
  TYPE_VALUE_OBJECT,
  TYPE_VALUE_STRING,
  TYPE_VALUE_VALUE,
} from '../utils/data-view-util.js';

export const SET_REMOTE_CONFIG = 'SET_REMOTE_CONFIG';
export const SET_FIREBASE_CONFIG_DEV = 'SET_FIREBASE_CONFIG_DEV';
export const SET_FIREBASE_CONFIG_PROD = 'SET_FIREBASE_CONFIG_PROD';
export const SUCCESS_FIREBASE = 'SUCCESS_FIREBASE';
export const SUCCESS_REMOTE_CONFIG = 'SUCCESS_REMOTE_CONFIG';
export const UPDATE_LAST_FETCH = 'UPDATE_LAST_FETCH';

const setRemoteConfig = remoteConfig => ({
  type: SET_REMOTE_CONFIG,
  remoteConfig,
});

const successFirebase = () => ({
  type: SUCCESS_FIREBASE,
});

const successRemoteConfig = () => ({
  type: SUCCESS_REMOTE_CONFIG,
});

const updateLastFetch = lastFetch => ({
  type: UPDATE_LAST_FETCH,
  lastFetch,
});

let remoteConfig;

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

export const firebaseInitializeApp = (enabledAnalytics = true) => (
  dispatch,
  getState
) => {
  const state = getState();
  const isDominioProd = crcaUrlIsDominioProdSelector(state);

  let config = null;
  if (isDominioProd) {
    const configProd = crcaFirebaseConfigProdSelector(state);
    if (configProd.config === null) {
      if (!configProd.useAsDev) {
        console.warn(
          'Firebase Config: Entorno de Producción cargará configuración de desarrollo.'
        );
      }
      const configDev = crcaFirebaseConfigDevSelector(state);
      if (configDev.config !== null) {
        config = configDev.config;
      }
    } else {
      config = configProd.config;
    }
  } else {
    const configDev = crcaFirebaseConfigDevSelector(state);
    if (configDev.config === null) {
      if (!configDev.useAsProd) {
        console.warn(
          'Firebase Config: Entorno de Desarrollo cargará configuración de producción.'
        );
      }
      const configProd = crcaFirebaseConfigProdSelector(state);
      if (configProd.config !== null) {
        config = configProd.config;
      }
    } else {
      config = configDev.config;
    }
  }

  if (config === null) {
    console.exception('No hay configuración de Firebase seteada');
    return;
  }

  firebase.initializeApp(config);
  dispatch(successFirebase(config));

  if (enabledAnalytics) {
    firebase.analytics();
  }
};

export const firebaseRemoteConfigActivate = () => dispatch => {
  remoteConfig
    .activate()
    .then(() => dispatch(setRemoteConfig(remoteConfig.getAll())))
    .catch(e => console.log('RemoteConfig: activate fail', e));
};

export const firebaseRemoteConfigFetch = () => dispatch => {
  remoteConfig
    .fetch()
    .then(dispatch(updateLastFetch(new Date())))
    .catch(e => console.log('RemoteConfig: fetch fail', e));
};

export const firebaseRemoteConfigLoadDefault = defaultConfig => (
  dispatch,
  getState
) => {
  const state = getState();
  const isDominioProd = crcaUrlIsDominioProdSelector(state);
  const initFirebase = crcaFirebaseInitSelector(state);

  if (initFirebase) {
    remoteConfig = firebase.remoteConfig();
    if (!isDominioProd) {
      remoteConfig.settings = {
        minimumFetchIntervalMillis: 3600000,
      };
    }
    remoteConfig.defaultConfig(defaultConfig);

    dispatch(firebaseRemoteConfigActivate());
    dispatch(successRemoteConfig());
  } else {
    console.log('No se ha inizializado Firebase');
  }
};

export const crcaFirebaseRemoteConfigGet = (
  key,
  typeValue = TYPE_VALUE_VALUE
) => {
  switch (typeValue) {
    case TYPE_VALUE_BOOLEAN:
      return remoteConfig.getBoolean(key);
    case TYPE_VALUE_NUMBER:
      return remoteConfig.getNumber(key);
    case TYPE_VALUE_STRING:
      return remoteConfig.getString(key);
    case TYPE_VALUE_OBJECT:
      return JSON.parse(remoteConfig.getString(key)) || {};
    default:
      return remoteConfig.getValue(key);
  }
};

export const crcaFirebaseRemoteConfigGetAll = () => {
  return remoteConfig.getAll();
};
