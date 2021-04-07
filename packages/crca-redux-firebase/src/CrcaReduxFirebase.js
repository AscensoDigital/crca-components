import { LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { CrcaStaticStore } from '@ascenso/crca-redux-store';
import {
  crcaUrlDominioSelector,
  crcaUrlPageSelector,
} from '@ascenso/crca-redux-url-parser/redux';

import { crcaFirebase } from './redux/reducer.js';
import {
  firebaseAuthStateChanged,
  firebaseInitializeApp,
  firebaseRemoteConfigActivate,
  firebaseRemoteConfigFetch,
  firebaseRemoteConfigLoadDefault,
  firebaseSignInAnonymously,
  updateLastFetch
} from './redux/actions.js';
import {
  crcaFirebaseAuthHasMethodSelector,
  crcaFirebaseAuthHasMethodsSelector,
  crcaFirebaseInitSelector,
  crcaFirebaseRemoteConfigInitSelector,
  crcaFirebaseRemoteConfigLastFetchSelector
} from './redux/selectors.js';
import { FB_AUTH_ANONYMOUSLY } from './consts.js';

CrcaStaticStore.store.addReducers({
  crcaFirebase,
});

export class CrcaReduxFirebase extends connect(CrcaStaticStore.store)(LitElement) {
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
      CrcaStaticStore.store.dispatch(firebaseInitializeApp());
    }

    if(this._firebaseInit) {
      if(changedProperties.has('_firebaseInit') && changedProperties.get('_firebaseInit')===false ){

        if(this.defaultRemoteConfig !== null) {
          CrcaStaticStore.store.dispatch(
            firebaseRemoteConfigLoadDefault(this.defaultRemoteConfig)
          );
        }

        if(this._signInAnonymously) {
          CrcaStaticStore.store.dispatch(firebaseSignInAnonymously());
        }

        if(this._hasAuthMethods) {
          CrcaStaticStore.store.dispatch(firebaseAuthStateChanged());
        }
      }

      if( this._remoteConfigInit && changedProperties.has('_remoteConfigInit')) {
        CrcaStaticStore.store.dispatch(firebaseRemoteConfigActivate());
        CrcaStaticStore.store.dispatch(firebaseRemoteConfigFetch());
      }
      else if ( changedProperties.has('_page') && this._page && this._lastFetch ) {
        CrcaStaticStore.store.dispatch(firebaseRemoteConfigActivate());
        CrcaStaticStore.store.dispatch(updateLastFetch(null));
      }
    }
  }
}
