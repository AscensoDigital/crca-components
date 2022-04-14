import { createSelector } from 'reselect';
import {
  isBoolean,
  isDefined,
  isNumber,
  isObject,
  isString,
} from '@ascenso/crca-utils';
import { crcaUrlEnvSelector } from '@ascenso/crca-redux-url-parser/redux';

import {
  FB_RC_TYPE_VALUE_BOOLEAN,
  FB_RC_TYPE_VALUE_NUMBER,
  FB_RC_TYPE_VALUE_OBJECT,
  FB_RC_TYPE_VALUE_STRING,
  FB_RC_TYPE_VALUE_VALUE,
} from '../consts.js';

const crcaFirebaseStateSelector = state => (state && state.crcaFirebase) || {};

const crcaFirebaseAuthSelector = createSelector(
  crcaFirebaseStateSelector,
  fb => fb.auth || {}
);

export const crcaFirebaseAuthMethodsSelector = createSelector(
  crcaFirebaseAuthSelector,
  auth => auth.methods || {}
);

export const crcaFirebaseAuthHasMethodsSelector = createSelector(
  crcaFirebaseAuthMethodsSelector,
  methods => Object.keys(methods).length>0
);

export const crcaFirebaseAuthHasMethodSelector = (method, state) => {
  const methods = crcaFirebaseAuthMethodsSelector(state);
  return isDefined(methods[method]);
}

export const crcaFirebaseAuthMethodSelector = (method, state) => {
  const methods = crcaFirebaseAuthMethodsSelector(state);
  return methods[method] || false;
}

export const crcaFirebaseAuthSignInSelector = createSelector(
  crcaFirebaseAuthSelector,
  auth => auth.signIn || false
);

export const crcaFirebaseAuthSignInMethodSelector = createSelector(
  crcaFirebaseAuthSelector,
  auth => auth.signInMethod || null
);

export const crcaFirebaseAuthUserSelector = createSelector(
  crcaFirebaseAuthSelector,
  auth => auth.user || null
);

export const crcaFirebaseAuthUserUidSelector = createSelector(
  crcaFirebaseAuthUserSelector,
  user => user && user.uid || false
);

export const crcaFirebaseInitSelector = createSelector(
  crcaFirebaseStateSelector,
  fb => fb.init || false
);

export const crcaFirebaseDiscordUrlSelector = createSelector(
  crcaFirebaseStateSelector,
  crcaUrlEnvSelector,
  (fb, env) => isObject(fb.discordUrl) && fb.discordUrl[env] || fb.discordUrl || ''
);

export const crcaFirebaseConfigDevSelector = createSelector(
  crcaFirebaseStateSelector,
  fb => fb.configDev || { config: null, useAsProd: false }
);

export const crcaFirebaseConfigProdSelector = createSelector(
  crcaFirebaseStateSelector,
  fb => fb.configProd || { config: null, useAsDev: false }
);

const crcaFirebaseRemoteConfigSelector = createSelector(
  crcaFirebaseStateSelector,
  fb => fb.remoteConfig || {}
);

export const crcaFirebaseRemoteConfigInitSelector = createSelector(
  crcaFirebaseRemoteConfigSelector,
  rc => rc.init || false
);

export const crcaFirebaseRemoteConfigConfigSelector = createSelector(
  crcaFirebaseRemoteConfigSelector,
  rc =>
    (isString(rc.config) && JSON.parse(rc.config)) ||
    (isObject(rc.config) && rc.config) ||
    {}
);

export const crcaFirebaseRemoteConfigErrorSelector = createSelector(
  crcaFirebaseRemoteConfigSelector,
  rc => rc.remoteError || false
);

export const crcaFirebaseRemoteConfigLastFetchSelector = createSelector(
  crcaFirebaseRemoteConfigSelector,
  rc => rc.lastFetch || false
);

export const crcaFirebaseRemoteConfigGetSelector = (
  state,
  key,
  typeValue = FB_RC_TYPE_VALUE_VALUE
) => {
  const rc = crcaFirebaseRemoteConfigConfigSelector(state);
  const value = rc[key];

  switch (typeValue) {
    case FB_RC_TYPE_VALUE_BOOLEAN:
      return isDefined(value)
        ? (isBoolean(value._value) && value._value) ||
            (isNumber(value._value) && value._value > 0) ||
            (isString(value._value) &&
              (parseInt(value._value, 10) > 0 || value._value === 'true')) ||
            false
        : false;
    case FB_RC_TYPE_VALUE_NUMBER:
      return isDefined(value)
        ? (isNumber(value._value) && value._value) ||
            (isString(value._value) && parseInt(value, 10)) ||
            (isBoolean(value._value) && value._value && 1) ||
            0
        : 0;
    case FB_RC_TYPE_VALUE_STRING:
      return isDefined(value)
        ? (isString(value._value) && value._value) ||
            (isObject(value._value) && JSON.stringify(value._value)) ||
            (isNumber(value._value) && value._value.toString()) ||
            ''
        : '';
    case FB_RC_TYPE_VALUE_OBJECT:
      return isDefined(value)
        ? (isObject(value._value) && value._value) ||
            (isString(value._value) && JSON.parse(value._value)) ||
            {}
        : {};
    default:
      return (isDefined(value) && value) || false;
  }
};
