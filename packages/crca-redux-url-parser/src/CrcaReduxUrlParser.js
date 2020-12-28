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
  crcaUrlSearchsSelector,
  crcaUrlSubdominioSelector,
  crcaUrlSectionParamsSelector
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
      searchs: { type: Object },
      sectionParams: { type: Array },
      subdominio: { type: String },
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
    this.searchs = crcaUrlSearchsSelector(state);
    this.sectionParams = crcaUrlSectionParamsSelector(state);
    this.subdominio = crcaUrlSubdominioSelector(state);
  }

  render() {
    return html`
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
        <li><b>searchs:</b>
          <ul>
            ${Object.keys(this.searchs).map( idx => html`<li>${idx} => ${this.searchs[idx]}</li>`)}
          </ul>
        </li>
      </ul>
      <a href="section/param1/param2?query_id=1&query_2=false#anchor1">Url demo con todas las partes</a>
    `;
  }
}
