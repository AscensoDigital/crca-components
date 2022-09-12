import {
  SET_FIREBASE_CONFIG_DEV,
  SET_FIREBASE_CONFIG_PROD,
  SET_FIREBASE_DISCORD_URL,
  SUCCESS_FIREBASE,
  SEND_FB_ANALYTICS_EVENT,
  SUCCESS_FB_ANALYTICS_EVENT,
  FAIL_FB_ANALYTICS_EVENT
} from './actions/app-actions.js';

import {
  SUCCESS_FIREBASE_SIGN_IN,
  UPDATE_FIREBASE_USER,
  SET_FIREBASE_AUTH_METHODS,
  LOGOUT_FIREBASE
} from './actions/auth-actions.js';

import { SUCCESS_FIRESTORE } from './actions/firestore-actions.js';

import {
  SET_REMOTE_CONFIG,
  SET_REMOTE_ERROR,
  SUCCESS_REMOTE_CONFIG,
  UPDATE_LAST_FETCH
} from './actions/remoteConfig-actions.js';

const initialRemoteState = {
  init: false,
  config: null,
  lastFetch: null,
  remoteError: false
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
  auth: initialAuthState,
  discordUrl: '',
  events: [],
  firestoreInit: false
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
    case SET_REMOTE_ERROR:
      return {
        ...state,
        remoteError: action.remoteError,
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
    case SET_REMOTE_ERROR:
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
    case SET_FIREBASE_DISCORD_URL:
      return {
        ...state,
        discordUrl: action.discordUrl
      }
    case SEND_FB_ANALYTICS_EVENT:
      return {
        ...state,
        events: [{eventId: action.detail.eventId, event: action.detail.event}, ...state.events]
      }
    case SUCCESS_FB_ANALYTICS_EVENT:
      return {
        ...state,
        events: state.events.filter(e => e.eventId!==action.eventId)
      }
    case FAIL_FB_ANALYTICS_EVENT:
      return {
        ...state,
        events: state.events.map(e => e.eventId===action.detail.eventId ? {...e, err: action.detail.err} : e)
      }
    case SUCCESS_FIRESTORE:
      return {
        ...state,
        firestoreInit: true
      }
    default:
      return state;
  }
};
