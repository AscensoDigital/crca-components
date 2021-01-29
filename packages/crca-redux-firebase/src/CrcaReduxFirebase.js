import { LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { crcaStore } from '@ascenso/crca-redux-store';
import {
  crcaUrlDominioSelector,
  crcaUrlPageSelector,
} from '@ascenso/crca-redux-url-parser';

import { crcaFirebase } from './redux/reducer.js';
import {
  firebaseAuthStateChanged,
  firebaseInitializeApp,
  firebaseRemoteConfigActivate,
  firebaseRemoteConfigFetch,
  firebaseRemoteConfigLoadDefault,
  firebaseSignInAnonymously,
} from './redux/actions.js';
import {
  crcaFirebaseAuthHasMethodSelector,
  crcaFirebaseAuthHasMethodsSelector,
  crcaFirebaseInitSelector,
  crcaFirebaseRemoteConfigInitSelector,
  crcaFirebaseRemoteConfigLastFetchSelector
} from './redux/selectors.js';
import { FB_AUTH_ANONYMOUSLY } from './consts.js';

crcaStore.addReducers({
  crcaFirebase,
});

export class CrcaReduxFirebase extends connect(crcaStore)(LitElement) {
  static get properties() {
    return {
      defaultRemoteConfig: { type: Object },
      _dominio: { type: String },
      _firebaseInit: { type: Boolean },
      _page: { type: String },
      _remoteConfigInit: { type: Boolean },
      _hasAuthMethods: { type: Boolean },
      _signInAnonymously: { type: Boolean },
      _lastFetch: { type: String }
    };
  }

  constructor() {
    super();
    this.defaultRemoteConfig = null;
  }

  stateChanged(state) {
    this._dominio = crcaUrlDominioSelector(state);
    this._firebaseInit = crcaFirebaseInitSelector(state);
    this._remoteConfigInit = crcaFirebaseRemoteConfigInitSelector(state);
    this._signInAnonymously = crcaFirebaseAuthHasMethodSelector(FB_AUTH_ANONYMOUSLY, state);
    this._hasAuthMethods = crcaFirebaseAuthHasMethodsSelector(state);
    this._page = crcaUrlPageSelector(state);
    this._lastFetch = crcaFirebaseRemoteConfigLastFetchSelector(state);
  }

  updated(changedProperties) {
    if (
      changedProperties.has('_dominio') &&
      this._dominio !== '' &&
      !this._firebaseInit
    ) {
      crcaStore.dispatch(firebaseInitializeApp());
    }

    if(this._firebaseInit) {
      if(changedProperties.has('_firebaseInit') && changedProperties.get('_firebaseInit')===false ){

        if(this.defaultRemoteConfig !== null) {
          crcaStore.dispatch(
            firebaseRemoteConfigLoadDefault(this.defaultRemoteConfig)
          );
        }

        if(this._signInAnonymously) {
          crcaStore.dispatch(firebaseSignInAnonymously());
        }

        if(this._hasAuthMethods) {
          crcaStore.dispatch(firebaseAuthStateChanged());
        }
      }

      if( this._remoteConfigInit && changedProperties.has('_remoteConfigInit')) {
        crcaStore.dispatch(firebaseRemoteConfigActivate());
        crcaStore.dispatch(firebaseRemoteConfigFetch());
      }
      else if ( changedProperties.has('_page') && this._page && this._lastFetch ) {
        crcaStore.dispatch(firebaseRemoteConfigActivate());
      }
    }
  }
}
