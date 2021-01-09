import { createSelector } from 'reselect';
import {
  isObject,
  TYPE_VALUE_BOOLEAN,
  TYPE_VALUE_NUMBER,
  TYPE_VALUE_VALUE,
  TYPE_VALUE_STRING,
  isDefined,
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
    (rc && typeof rc.config === 'string' && JSON.parse(rc.config)) ||
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
        ? parseInt(value, 10) > 0 || value === 'true'
        : false;
    case TYPE_VALUE_NUMBER:
      return (isDefined(value) && parseInt(value, 10)) || 0;
    case TYPE_VALUE_STRING:
      return (
        (isDefined(value) && isObject(value) && JSON.stringify(value)) ||
        (isDefined(value) && value) ||
        false
      );
    default:
      return (isDefined(value) && value) || false;
  }
};
