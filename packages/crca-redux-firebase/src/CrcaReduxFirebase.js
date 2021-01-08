import { LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { crcaStore } from '@ascenso/crca-redux-store';
import {
  crcaUrlDominioSelector,
  crcaUrlPageSelector,
} from '@ascenso/crca-redux-url-parser';

import { crcaFirebase } from './redux/reducer.js';
import {
  firebaseInitializeApp,
  firebaseRemoteConfigActivate,
  firebaseRemoteConfigFetch,
  firebaseRemoteConfigLoadDefault,
} from './redux/actions.js';
import {
  crcaFirebaseInitSelector,
  crcaFirebaseRemoteConfigInitSelector,
} from './redux/selectors.js';

crcaStore.addReducers({
  crcaFirebase,
});

export class CrcaReduxFirebase extends connect(crcaStore)(LitElement) {
  static get properties() {
    return {
      activateConfigOnChangePage: { type: Boolean },
      defaultRemoteConfig: { type: Object },
      _dominio: { type: String },
      _firebaseInit: { type: Boolean },
      _page: { type: String },
      _remoteConfigInit: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.activateConfigOnChangePage = false;
    this.defaultRemoteConfig = null;
  }

  stateChanged(state) {
    this._dominio = crcaUrlDominioSelector(state);
    this._firebaseInit = crcaFirebaseInitSelector(state);
    this._remoteConfigInit = crcaFirebaseRemoteConfigInitSelector(state);
    if (this.activateConfigOnChangePage) {
      this._page = crcaUrlPageSelector(state);
    }
  }

  updated(changedProperties) {
    if (
      changedProperties.has('_dominio') &&
      this._dominio !== '' &&
      !this._firebaseInit
    ) {
      crcaStore.dispatch(firebaseInitializeApp());
    }

    if (
      changedProperties.has('_firebaseInit') &&
      this._firebaseInit &&
      this.defaultRemoteConfig !== null
    ) {
      crcaStore.dispatch(
        firebaseRemoteConfigLoadDefault(this.defaultRemoteConfig)
      );
    }

    if (
      this._firebaseInit &&
      this._remoteConfigInit &&
      this._page &&
      (changedProperties.has('_remoteConfigInit') ||
        changedProperties.has('_page'))
    ) {
      crcaStore.dispatch(firebaseRemoteConfigActivate());
      crcaStore.dispatch(firebaseRemoteConfigFetch());
    }
  }
}
