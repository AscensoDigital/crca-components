import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { installRouter } from 'pwa-helpers/router';
import { installOfflineWatcher } from 'pwa-helpers/network';
import { CrcaStaticStore } from '@ascenso/crca-redux-store';
import { infoFeedback } from '@ascenso/crca-redux-feedback/redux';

import { crcaUrl } from './redux/reducer.js';
import {
  crcaUrlHomepageSelector,
  crcaUrlIsHostProdSelector,
  crcaUrlIsStatusMaintenanceSelector,
  crcaUrlIsStatusSuspendedSelector,
  crcaUrlLastPageSelector,
  crcaUrlOfflineSelector,
  crcaUrlPageSelector
} from './redux/selectors.js';
import {
  crcaUrlHandleNavigation,
  crcaUrlNavigate,
  crcaUrlUpdateOffline
} from './redux/actions.js';
import { CRCA_URL_PAGE_MAINTENANCE, CRCA_URL_PAGE_SUSPENDED, CRCA_URL_PAGES_BLOCKED } from './page.js';

CrcaStaticStore.store.addReducers({
  crcaUrl
});

export class CrcaReduxUrlParser extends connect(CrcaStaticStore.store)(LitElement) {
  static get styles() {
    return css`
    .offline {
      width: var(--crca-url-offline-width, 95vw);
      background-color: var(--crca-url-offline-background-color, red);
      color: var(--crca-url-offline-color, #fff);
      padding: var(--crca-url-offline-padding, 10px);
      border-bottom-left-radius: var(--crca-url-offline-border-bottom-left-radius, 5px);
      border-bottom-right-radius: var(--crca-url-offline-border-bottom-right-radius, 5px);
      margin: var(--crca-url-offline-margin, 0 auto);
      text-align: var(--crca-url-offline-text-align, center);
    }

    .env-dev {
      width: var(--crca-url-env-dev-width, 95vw);
      background-color: var(--crca-url-env-dev-background-color, yellow);
      color: var(--crca-url-env-dev-color, red);
      padding: var(--crca-url-env-dev-padding, 10px);
      border-bottom-left-radius: var(--crca-url-env-dev-border-bottom-left-radius, 5px);
      border-bottom-right-radius: var(--crca-url-env-dev-border-bottom-right-radius, 5px);
      margin: var(--crca-url-env-dev-margin, 0 auto);
      text-align: var(--crca-url-env-dev-text-align, center);
    }
    `;
  }

  static get properties() {
    return {
      handleOffline: { type: Boolean },
      showEnvDev: { type: Boolean },
      showOffline: { type: Boolean },
      reloadMaintenanceOff: { type: Boolean },
      _isDev: { type: Boolean },
      _offline: { type: Boolean },
      _suspended: { type: Boolean },
      _maintenance: { type: Boolean },
      _lastPage: { type: Boolean },
      _page: { type: String }
    };
  }

  constructor() {
    super();

    installRouter((location, event) => {
      // Only scroll to top on link clicks, not popstate events.
      if (event && event.type === 'click') {
        window.scrollTo(0, 0);
      }
      CrcaStaticStore.store.dispatch(crcaUrlHandleNavigation(location));
    });

    this.handleOffline = false;
    this.showEnvDev = false;
    this.showOffline = false;
    this.reloadMaintenanceOff = false;
  }

  firstUpdated() {
    if(this.handleOffline) {
      installOfflineWatcher(offline =>
        CrcaStaticStore.store.dispatch(crcaUrlUpdateOffline(offline))
      );
    }
  }

  stateChanged(state) {
    this._offline = crcaUrlOfflineSelector(state);
    this._isDev = !crcaUrlIsHostProdSelector(state);
    this._suspended = crcaUrlIsStatusSuspendedSelector(state);
    this._maintenance = crcaUrlIsStatusMaintenanceSelector(state);
    this._lastPage = crcaUrlLastPageSelector(state) || crcaUrlHomepageSelector(state);
    this._page = crcaUrlPageSelector(state);
  }

  render() {
    return html`
      ${this.showOffline && this._offline
          ? html`<div class="offline"><slot name="offline">Estás sin conexión a internet</slot></div>`
          : ''}
        ${this.showEnvDev && this._isDev
          ? html`<div class="env-dev"><slot name="env-dev">Estás en un entorno de Desarrollo</slot></div>`
          : ''}
    `;
  }

  updated(changedProperties) {
    if(changedProperties.has('_suspended') && this._suspended) {
      CrcaStaticStore.store.dispatch(crcaUrlNavigate(CRCA_URL_PAGE_SUSPENDED));
    }
    if( changedProperties.has('_suspended') && this._suspended===false &&
      CRCA_URL_PAGES_BLOCKED.includes(this._page)
    ) {
      CrcaStaticStore.store.dispatch(crcaUrlNavigate(this._lastPage));
    }

    if(changedProperties.has('_maintenance') && this._maintenance) {
      CrcaStaticStore.store.dispatch(crcaUrlNavigate(CRCA_URL_PAGE_MAINTENANCE));
    }
    if( changedProperties.has('_maintenance') && this._maintenance===false &&
      CRCA_URL_PAGES_BLOCKED.includes(this._page)
    ) {
        CrcaStaticStore.store.dispatch(crcaUrlNavigate(this._lastPage));
        if(this.reloadMaintenanceOff) {
          CrcaStaticStore.store.dispatch(infoFeedback('Se Recargará el sitio en 3 segundos, por actualización de versión'));
          setTimeout(() => window.location.reload(), 3000);
        }
    }
  }
}
