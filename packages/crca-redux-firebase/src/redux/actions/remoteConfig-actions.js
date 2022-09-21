import { isNull, isObject, stringifyPropValue } from "@ascenso/crca-utils";
import {
  getRemoteConfig,
  isSupported,
  getBoolean,
  getNumber,
  getString,
  getValue,
  getAll,
  activate,
  fetchAndActivate,
  fetchConfig
} from "firebase/remote-config";

import {
  FB_RC_TYPE_VALUE_BOOLEAN,
  FB_RC_TYPE_VALUE_NUMBER,
  FB_RC_TYPE_VALUE_OBJECT,
  FB_RC_TYPE_VALUE_STRING,
  FB_RC_TYPE_VALUE_VALUE
} from '../../consts.js';

import { CrcaFirebaseLoader } from '../../CrcaFirebaseLoader.js';
import { crcaFirebaseInitSelector } from '../selectors/app-selectors.js';
import { sendError } from './app-actions.js';

export const SET_REMOTE_CONFIG = 'SET_REMOTE_CONFIG';
export const SET_REMOTE_ERROR = 'SET_REMOTE_ERROR';
export const SUCCESS_REMOTE_CONFIG = 'SUCCESS_REMOTE_CONFIG';
export const UPDATE_LAST_FETCH = 'UPDATE_LAST_FETCH';

const setRemoteConfig = config => ({
  type: SET_REMOTE_CONFIG,
  config,
});

const setRemoteError = remoteError => ({
  type: SET_REMOTE_ERROR,
  remoteError,
});

const successRemoteConfig = () => ({
  type: SUCCESS_REMOTE_CONFIG,
});

export const updateLastFetch = lastFetch => ({
  type: UPDATE_LAST_FETCH,
  lastFetch,
});


export const firebaseRemoteConfigActivate = () => (dispatch, getState) => {
  const state = getState();
  if(!isNull(CrcaFirebaseLoader.remoteConfig)){
    activate(CrcaFirebaseLoader.remoteConfig)
    .then(() => {
      dispatch(setRemoteConfig(getAll(CrcaFirebaseLoader.remoteConfig)));
    })
    .catch(e => {
      dispatch(setRemoteError(true));
      dispatch(setRemoteConfig(CrcaFirebaseLoader.remoteConfigDefault));
      sendError(state, 'firebaseRemoteConfigActive-catch', e);
    });
  }
};

export const firebaseRemoteConfigFetch = () => (dispatch, getState) => {
  const state = getState();

  if(!isNull(CrcaFirebaseLoader.remoteConfig)){
    fetchConfig(CrcaFirebaseLoader.remoteConfig)
    .then(() => {
      dispatch(updateLastFetch(new Date()));
    })
    .catch(e => sendError(state, 'firebaseRemoteConfigFetch-catch', e));
  }
};

export const firebaseRemoteConfigFetchAndActivate = () => (dispatch, getState) => {
  const state = getState();
  if(!isNull(CrcaFirebaseLoader.remoteConfig)) {
    fetchAndActivate(CrcaFirebaseLoader.remoteConfig)
    .then( () => {
      dispatch(setRemoteConfig(getAll(CrcaFirebaseLoader.remoteConfig)));
    })
    .catch(e => {
      dispatch(setRemoteError(true));
      dispatch(setRemoteConfig(CrcaFirebaseLoader.remoteConfigDefault));
      sendError(state, 'firebaseRemoteConfigFetchAndActivate-catch', e);
    });
  }
};

export const firebaseRemoteConfigLoadDefault = defaultConfig => async (
  dispatch,
  getState
) => {
  const state = getState();
  const initFirebase = crcaFirebaseInitSelector(state);
  CrcaFirebaseLoader.remoteConfigDefault=defaultConfig;

  if (initFirebase) {
    const isSupportedRemoteConfig = await isSupported();

    if(isSupportedRemoteConfig) {
      try {
        CrcaFirebaseLoader.remoteConfig = getRemoteConfig(CrcaFirebaseLoader.firebase);
        /* if (!isDominioProd) {
          CrcaFirebaseLoader.remoteConfig.settings = {
            minimumFetchIntervalMillis: 300000,
          };
        } */
        CrcaFirebaseLoader.remoteConfig.defaultConfig = stringifyPropValue(defaultConfig) || {};
        dispatch(successRemoteConfig());
      }
      catch(err) {
        dispatch(setRemoteError(true));
        sendError(state, 'firebaseRemoteConfigLoadDefault-catch', err);
      }
    }
    else {
      dispatch(setRemoteError(true));
      sendError(state, 'firebaseRemoteConfigLoadDefault', { error: 'Remote Config no soportado'});
    }

  } else {
    dispatch(setRemoteError(true));
    sendError(state, 'firebaseRemoteConfigLoadDefault', { error: 'No se ha inizializado Firebase'});
  }
};

export const crcaFirebaseRemoteConfigGet = (
  key,
  typeValue = FB_RC_TYPE_VALUE_VALUE
) => {
  if(isNull(CrcaFirebaseLoader.remoteConfig)) {
    // console.log('No se a inicializado remoteConfig, usando defaultConfig');
    return CrcaFirebaseLoader.remoteConfigDefault[key] || false;
  }
  try {
    switch (typeValue) {
      case FB_RC_TYPE_VALUE_BOOLEAN:
        return getBoolean(CrcaFirebaseLoader.remoteConfig, key);
      case FB_RC_TYPE_VALUE_NUMBER:
        return getNumber(CrcaFirebaseLoader.remoteConfig, key);
      case FB_RC_TYPE_VALUE_STRING:
        return getString(CrcaFirebaseLoader.remoteConfig, key);
      case FB_RC_TYPE_VALUE_OBJECT:
        return (
          (isObject(getValue(CrcaFirebaseLoader.remoteConfig, key)._value) &&
          getValue(CrcaFirebaseLoader.remoteConfig, key)._value) ||
          JSON.parse(getString(CrcaFirebaseLoader.remoteConfig, key)) ||
          {}
        );
      default:
        return getValue(CrcaFirebaseLoader.remoteConfig, key);
    }
  } catch (error) {
    return CrcaFirebaseLoader.remoteConfigDefault[key] || false;
  }
};

export const crcaFirebaseRemoteConfigGetAll = () => {
  if(isNull(CrcaFirebaseLoader.remoteConfig)) {
    // console.log('No se a inicializado remoteConfig, usando defaultConfig');
    return CrcaFirebaseLoader.remoteConfigDefault || {};
  }
  try {
    return getAll(CrcaFirebaseLoader.remoteConfig);
  } catch (error) {
    return CrcaFirebaseLoader.remoteConfigDefault || {};
  }
};
