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
