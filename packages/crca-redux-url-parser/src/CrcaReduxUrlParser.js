import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { installRouter } from 'pwa-helpers/router';
import { crcaStore } from '@ascenso/crca-redux-store';
import { crcaUrl } from './redux/reducer.js';
import {
  crcaUrlAnchorSelector,
  crcaUrlDominioSelector,
  crcaUrlLastPageSelector,
  crcaUrlPageSectionSelector,
  crcaUrlPageSelector,
  crcaUrlSearchSelector,
  crcaUrlSubdominioSelector,
  crcaUrlSectionParamsSelector,
  crcaUrlDominiosProdSelector,
  crcaUrlPageNotLastSelector,
  crcaUrlDevSubdominioSelector,
  crcaUrlManualUpdateSelector,
  crcaUrlHomepageSelector
} from './redux/selectors.js';

import { crcaUrlHandleNavigation } from './redux/actions.js';

crcaStore.addReducers({
  crcaUrl
});

export class CrcaReduxUrlParser extends connect(crcaStore)(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--crca-redux-url-parser-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      anchor: { type: String },
      dominio: { type: String },
      lastPage: { type: String },
      page: { type: String },
      pageSection: { type: String },
      search: { type: Object },
      sectionParams: { type: Array },
      subdominio: { type: String },
      devSubdominio: { type: String },
      dominiosProd: { type: Array },
      homepage: { type: String },
      manualUpdate: { type: Object },
      pageNotLast: { type: Array },
    };
  }

  constructor() {
    super();

    installRouter((location, event) => {
      // Only scroll to top on link clicks, not popstate events.
      if (event && event.type === 'click') {
        window.scrollTo(0, 0);
      }
      crcaStore.dispatch(crcaUrlHandleNavigation(location));
    });
  }

  stateChanged(state) {
    this.anchor = crcaUrlAnchorSelector(state);
    this.dominio = crcaUrlDominioSelector(state);
    this.lastPage = crcaUrlLastPageSelector(state);
    this.page = crcaUrlPageSelector(state);
    this.pageSection = crcaUrlPageSectionSelector(state);
    this.search = crcaUrlSearchSelector(state);
    this.sectionParams = crcaUrlSectionParamsSelector(state);
    this.subdominio = crcaUrlSubdominioSelector(state);

    this.devSubdominio = crcaUrlDevSubdominioSelector(state);
    this.dominiosProd = crcaUrlDominiosProdSelector(state);
    this.homepage = crcaUrlHomepageSelector(state);
    this.manualUpdate = crcaUrlManualUpdateSelector(state);
    this.pageNotLast = crcaUrlPageNotLastSelector(state);
  }

  render() {
    return html`
      <h1>crca-redux-url-parser</h1>
      <h2>Datos Url Parseada</h2>
      <ul>
        <li><b>subdominio:</b> ${this.subdominio}</li>
        <li><b>dominio:</b> ${this.dominio}</li>
        <li><b>page:</b> ${this.page}</li>
        <li><b>pageSection:</b> ${this.pageSection}</li>
        <li><b>sectionParams:</b>
          <ul>
            ${this.sectionParams.map((sp, idx) => html`<li>${idx} => ${sp}</li>`)}
          </ul>
        </li>
        <li><b>anchor:</b> ${this.anchor}</li>
        <li><b>search:</b>
          <ul>
            ${Object.keys(this.search).map( idx => html`<li>${idx} => ${this.search[idx]}</li>`)}
          </ul>
        </li>
      </ul>
      <a href="section/param1/param2?query_id=1&query_2=false#anchor1">Url demo con todas las partes</a>

      <h2>Parámetros Configurables (valores por defecto)</h2>
      <ul>
        <li><b>devSubdominio:</b> ${this.devSubdominio}</li>
        <li><b>dominiosProd:</b>
          <ul>
            ${this.dominiosProd.map((sp, idx) => html`<li>${idx} => ${sp}</li>`)}
          </ul>
        </li>
        <li><b>homepage:</b> ${this.homepage}</li>
        <li><b>manualUpdate:</b>
          <ul>
            ${Object.keys(this.manualUpdate).map( idx => html`<li>${idx} => ${this.manualUpdate[idx] ? 'true' : 'false'}</li>`)}
          </ul>
        </li>
        <li><b>pageNotLast:</b>
          <ul>
            ${this.pageNotLast.map((sp, idx) => html`<li>${idx} => ${sp}</li>`)}
          </ul>
        </li>
      </ul>
    `;
  }
}
