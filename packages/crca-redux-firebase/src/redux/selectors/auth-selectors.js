import { isDefined } from '@ascenso/crca-utils';
import { createSelector } from 'reselect';

import { crcaFirebaseStateSelector } from './app-selectors.js';

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
