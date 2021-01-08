import { createSelector } from 'reselect';

const crcaFirebaseStateSelector = state => (state && state.firebase) || {};

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
  rc => (rc && rc.config) || {}
);

export const crcaFirebaseRemoteConfigLastFetchSelector = createSelector(
  crcaFirebaseRemoteConfigSelector,
  rc => (rc && rc.lastFetch) || false
);

export const TYPE_VALUE_VALUE = 'value';
export const TYPE_VALUE_BOOLEAN = 'boolean';
export const TYPE_VALUE_INT = 'int';

export const crcaFirebaseRemoteConfigGetSelector = (
  state,
  key,
  typeValue = TYPE_VALUE_VALUE
) => {
  const rc = crcaFirebaseRemoteConfigConfigSelector(state);
  const value = rc[key];

  switch (typeValue) {
    case TYPE_VALUE_BOOLEAN:
      return value !== undefined
        ? parseInt(value, 10) > 0 || value === 'true'
        : false;
    case TYPE_VALUE_INT:
      return value !== undefined ? parseInt(value, 10) : 0;
    default:
      return value !== undefined ? value : false;
  }
};
