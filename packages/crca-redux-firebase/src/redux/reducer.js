import {
  SET_FIREBASE_CONFIG_DEV,
  SET_FIREBASE_CONFIG_PROD,
  SET_REMOTE_CONFIG,
  SUCCESS_FIREBASE,
  SUCCESS_REMOTE_CONFIG,
  SUCCESS_FIREBASE_SIGN_IN,
  UPDATE_LAST_FETCH,
  UPDATE_FIREBASE_USER,
  SET_FIREBASE_AUTH_METHODS,
  LOGOUT_FIREBASE
} from './actions.js';

const initialRemoteState = {
  init: false,
  config: null,
  lastFetch: null,
};

const initialAuthState = {
  methods: {},
  signIn: false,
  signInMethod: null,
  user: null
}

const initialState = {
  init: false,
  configDev: { config: null, useAsProd: false },
  configProd: { config: null, useAsDev: false },
  remoteConfig: initialRemoteState,
  auth: initialAuthState
};

const authReducer = (state,action) => {
  switch (action.type) {
    case SET_FIREBASE_AUTH_METHODS:
      return {
        ...state,
        methods: action.methods
      }
    case SUCCESS_FIREBASE_SIGN_IN:
      return {
        ...state,
        signIn: true,
        signInMethod: action.signInMethod
      };
    case UPDATE_FIREBASE_USER:
      return {
        ...state,
        user: action.user,
      }
    case LOGOUT_FIREBASE:
      return {
        ...state,
        signIn: false,
        signInMethod: null,
        user: null
      }
    default:
      return state;
  }
}

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
    case SUCCESS_FIREBASE_SIGN_IN:
    case UPDATE_FIREBASE_USER:
    case SET_FIREBASE_AUTH_METHODS:
    case LOGOUT_FIREBASE:
      return {
        ...state,
        auth: authReducer(state.auth, action)
      }
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
