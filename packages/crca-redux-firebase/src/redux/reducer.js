import {
  SET_FIREBASE_CONFIG_DEV,
  SET_FIREBASE_CONFIG_PROD,
  SET_REMOTE_CONFIG,
  SUCCESS_FIREBASE,
  SUCCESS_REMOTE_CONFIG,
  UPDATE_LAST_FETCH,
} from './actions.js';

const initialRemoteState = {
  init: false,
  config: null,
  lastFetch: null,
};

const initialState = {
  init: false,
  configDev: { config: null, useAsProd: false },
  configProd: { config: null, useAsDev: false },
  remoteConfig: initialRemoteState,
};

const remoteConfigReducer = (state, action) => {
  switch (action.type) {
    case SUCCESS_REMOTE_CONFIG:
      return {
        ...state,
        init: true,
      };
    case SET_REMOTE_CONFIG:
      return {
        ...state,
        config: action.config,
      };
    case UPDATE_LAST_FETCH:
      return {
        ...state,
        lastFetch: action.lastFetch,
      };
    default:
      return state;
  }
};

export const crcaFirebase = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_REMOTE_CONFIG:
    case SET_REMOTE_CONFIG:
    case UPDATE_LAST_FETCH:
      return {
        ...state,
        remoteConfig: remoteConfigReducer(state.remoteConfig, action),
      };
    case SUCCESS_FIREBASE:
      return {
        ...state,
        init: true,
      };
    case SET_FIREBASE_CONFIG_DEV:
      return {
        ...state,
        configDev: action.configDev,
      };
    case SET_FIREBASE_CONFIG_PROD:
      return {
        ...state,
        configProd: action.configProd,
      };
    default:
      return state;
  }
};
