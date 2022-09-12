import { createSelector } from 'reselect';
import {
  isObject
} from '@ascenso/crca-utils';
import { crcaUrlEnvSelector } from '@ascenso/crca-redux-url-parser/redux';

export const crcaFirebaseStateSelector = state => (state && state.crcaFirebase) || {};

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