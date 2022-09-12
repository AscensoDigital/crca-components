import { LitElement } from 'lit';
import { connect } from 'pwa-helpers';
import { CrcaStaticStore } from '@ascenso/crca-redux-store';
import {
  crcaUrlDominioSelector,
  crcaUrlPageSelector,
} from '@ascenso/crca-redux-url-parser/redux';

import { crcaFirebase } from './redux/reducer.js';
import {
  firebaseInitializeApp,
} from './redux/actions/app-actions.js';

import {
  firebaseAuthStateChanged,
  firebaseSignInAnonymously,
} from './redux/actions/auth-actions.js';

import {
  firebaseRemoteConfigActivate,
  firebaseRemoteConfigFetch,
  firebaseRemoteConfigFetchAndActivate,
  firebaseRemoteConfigLoadDefault,
  updateLastFetch
} from './redux/actions/remoteConfig-actions.js';

import {
  crcaFirebaseInitSelector,
} from './redux/selectors/app-selectors.js';

import {
  crcaFirebaseAuthHasMethodSelector,
  crcaFirebaseAuthHasMethodsSelector,
} from './redux/selectors/auth-selectors.js';

import {
  crcaFirebaseRemoteConfigInitSelector,
  crcaFirebaseRemoteConfigLastFetchSelector
} from './redux/selectors/remoteConfig-selectors.js';

import { firestoreInitialize } from './redux/actions/firestore-actions.js';

import { FB_AUTH_ANONYMOUSLY } from './consts.js';

CrcaStaticStore.store.addReducers({
  crcaFirebase,
});

export class CrcaReduxFirebase extends connect(CrcaStaticStore.store)(LitElement) {
  static get properties() {
    return {
      defaultRemoteConfig: { type: Object },
      fetchAndActivate: { type: Boolean },
      firestore: { type: Boolean },
      analytics:  { type: Boolean },
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
    this.fetchAndActivate = false;
    this.firestore = false;
    this.analytics = false;
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
      CrcaStaticStore.store.dispatch(firebaseInitializeApp(this.analytics));
    }

    if(this._firebaseInit) {
      if(changedProperties.has('_firebaseInit') && changedProperties.get('_firebaseInit')===false ){

        if(this.firestore) {
          CrcaStaticStore.store.dispatch(
            firestoreInitialize()
          );
        }

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
        if(this.fetchAndActivate) {
          CrcaStaticStore.store.dispatch(firebaseRemoteConfigFetchAndActivate());
        }
        else {
          CrcaStaticStore.store.dispatch(firebaseRemoteConfigActivate());
          CrcaStaticStore.store.dispatch(firebaseRemoteConfigFetch());
        }
      }
      else if (!this.fetchAndActivate && changedProperties.has('_page') && this._page && this._lastFetch ) {
        CrcaStaticStore.store.dispatch(firebaseRemoteConfigActivate());
        CrcaStaticStore.store.dispatch(updateLastFetch(null));
      }
    }
  }
}
