import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";

import { crcaUrlIsHostProdSelector } from '@ascenso/crca-redux-url-parser/redux';
import {
  isDefined,
  isNull,
  sendErrorDiscord
} from '@ascenso/crca-utils';

import {
  crcaFirebaseConfigDevSelector,
  crcaFirebaseConfigProdSelector,
  crcaFirebaseDiscordUrlSelector
} from '../selectors/app-selectors.js';

import { CrcaFirebaseLoader } from '../../CrcaFirebaseLoader.js';

export const SET_FIREBASE_DISCORD_URL = 'SET_FIREBASE_DISCORD_URL';
export const SET_FIREBASE_CONFIG_DEV = 'SET_FIREBASE_CONFIG_DEV';
export const SET_FIREBASE_CONFIG_PROD = 'SET_FIREBASE_CONFIG_PROD';
export const SUCCESS_FIREBASE = 'SUCCESS_FIREBASE';
export const SEND_FB_ANALYTICS_EVENT = 'SEND_FB_ANALYTICS_EVENT';
export const SUCCESS_FB_ANALYTICS_EVENT = 'SUCCESS_FB_ANALYTICS_EVENT';
export const FAIL_FB_ANALYTICS_EVENT = 'FAIL_FB_ANALYTICS_EVENT';


const failFbAnalyticsEvent = (eventId, err) => ({
  type: FAIL_FB_ANALYTICS_EVENT,
  detail: {
    eventId,
    err
  }
});

const sendFbAnalyticsEvent = (eventId,event) => ({
  type: SEND_FB_ANALYTICS_EVENT,
  detail: {
    eventId,
    event
  }
});

const successFbAnalyticsEvent = eventId => ({
  type: SUCCESS_FB_ANALYTICS_EVENT,
  eventId
});

const successFirebase = () => ({
  type: SUCCESS_FIREBASE,
});


export const sendError = (state, tag, err, data = {})  => {
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

export const crcaFirebaseGet = () => CrcaFirebaseLoader.firebase;

export const crcaFirebaseAnalyticsLogEvent = (eventName, payload = null) => (getState, dispatch) => {
  const state = getState();
  const date = new Date();
  const eventId = `${eventName}-${date.valueOf()}`;

  dispatch(sendFbAnalyticsEvent(eventId,{eventName, payload}));
  if(!isDefined(CrcaFirebaseLoader.analytics)) {
    const err = { error: 'Analytics no inicializado'};
    sendError(state,'crcaFirebaseAnalyticsLogEvent',err);
    dispatch(failFbAnalyticsEvent(eventId, err));
    return;
  }

  try {
    if(isNull(payload)) {
      logEvent(CrcaFirebaseLoader.analytics, eventName);
    }
    else {
      logEvent(CrcaFirebaseLoader.analytics, eventName, payload);
    }
    dispatch(successFbAnalyticsEvent(eventId));
  } catch (error) {
    sendError(state,'crcaFirebaseAnalyticsLogEvent-catch',error, {eventName, payload});
    dispatch(failFbAnalyticsEvent(eventId, error));
  }
}


export const firebaseInitializeApp = (enabledAnalytics = true) => async (
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
          sendError(state,'firebaseInitializeApp',{error: 'Firebase Config: Entorno de Producción cargará configuración de desarrollo.'});
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
          sendError(state,'firebaseInitializeApp',{error: 'Firebase Config: Entorno de Desarrollo cargará configuración de producción.'});
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
      sendError(state,'firebaseInitializeApp',{error: 'No hay configuración de Firebase seteada'});
      return;
    }

    CrcaFirebaseLoader.firebase=initializeApp(config);
    dispatch(successFirebase(config));
    const isSupportedAnalytics = await isSupported();
    if (enabledAnalytics && isSupportedAnalytics) {
      CrcaFirebaseLoader.analytics = getAnalytics(CrcaFirebaseLoader.firebase);
    }
  } catch (error) {
    sendError(state,'firebaseInitializeApp-catch',error,{enabledAnalytics, isDominioProd});
  }
};
