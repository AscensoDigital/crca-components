import { createSelector } from 'reselect';
import { isBoolean, isDefined, isNumber, isObject, isString } from '@ascenso/crca-utils';

import { crcaFirebaseStateSelector } from './app-selectors.js';
import {
  FB_RC_TYPE_VALUE_BOOLEAN,
  FB_RC_TYPE_VALUE_NUMBER,
  FB_RC_TYPE_VALUE_OBJECT,
  FB_RC_TYPE_VALUE_STRING,
  FB_RC_TYPE_VALUE_VALUE,
} from '../../consts.js';

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
  const remoteError = crcaFirebaseRemoteConfigErrorSelector(state);
  // console.log(key, typeValue, rc, remoteError);
  if(remoteError) {
    return rc[key] || false;
  }
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
