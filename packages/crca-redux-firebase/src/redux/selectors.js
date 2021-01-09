import { createSelector } from 'reselect';
import {
  TYPE_VALUE_BOOLEAN,
  TYPE_VALUE_NUMBER,
  TYPE_VALUE_OBJECT,
  TYPE_VALUE_STRING,
  TYPE_VALUE_VALUE,
  isBoolean,
  isDefined,
  isNumber,
  isObject,
  isString,
} from '../utils/data-view-util.js';

const crcaFirebaseStateSelector = state => (state && state.crcaFirebase) || {};

export const crcaFirebaseInitSelector = createSelector(
  crcaFirebaseStateSelector,
  fb => (fb && fb.init) || false
);

export const crcaFirebaseConfigDevSelector = createSelector(
  crcaFirebaseStateSelector,
  fb => (fb && fb.configDev) || { config: null, useAsProd: false }
);

export const crcaFirebaseConfigProdSelector = createSelector(
  crcaFirebaseStateSelector,
  fb => (fb && fb.configProd) || { config: null, useAsDev: false }
);

const crcaFirebaseRemoteConfigSelector = createSelector(
  crcaFirebaseStateSelector,
  fb => (fb && fb.remoteConfig) || {}
);

export const crcaFirebaseRemoteConfigInitSelector = createSelector(
  crcaFirebaseRemoteConfigSelector,
  rc => (rc && rc.init) || false
);

export const crcaFirebaseRemoteConfigConfigSelector = createSelector(
  crcaFirebaseRemoteConfigSelector,
  rc =>
    (rc && isString(rc.config) && JSON.parse(rc.config)) ||
    (rc && isObject(rc.config) && rc.config) ||
    {}
);

export const crcaFirebaseRemoteConfigLastFetchSelector = createSelector(
  crcaFirebaseRemoteConfigSelector,
  rc => (rc && rc.lastFetch) || false
);

export const crcaFirebaseRemoteConfigGetSelector = (
  state,
  key,
  typeValue = TYPE_VALUE_VALUE
) => {
  const rc = crcaFirebaseRemoteConfigConfigSelector(state);
  const value = rc[key];

  switch (typeValue) {
    case TYPE_VALUE_BOOLEAN:
      return isDefined(value)
        ? (isBoolean(value._value) && value._value) ||
            (isNumber(value._value) && value._value > 0) ||
            (isString(value._value) &&
              (parseInt(value._value, 10) > 0 || value._value === 'true')) ||
            false
        : false;
    case TYPE_VALUE_NUMBER:
      return isDefined(value)
        ? (isNumber(value._value) && value._value) ||
            (isString(value._value) && parseInt(value, 10)) ||
            (isBoolean(value._value) && value._value && 1) ||
            0
        : 0;
    case TYPE_VALUE_STRING:
      return isDefined(value)
        ? (isString(value._value) && value._value) ||
            (isObject(value._value) && JSON.stringify(value._value)) ||
            (isNumber(value._value) && value._value.toString()) ||
            ''
        : '';
    case TYPE_VALUE_OBJECT:
      return isDefined(value)
        ? (isObject(value._value) && value._value) ||
            (isString(value._value) && JSON.parse(value._value)) ||
            {}
        : {};
    default:
      return (isDefined(value) && value) || false;
  }
};
