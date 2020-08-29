import { html, css, LitElement } from 'lit-element';
import  { crcaStore } from '@ascenso/crca-redux-store';
import { connect } from 'pwa-helpers/connect-mixin'

import { crcaLoading } from './redux/reducer.js';

import '@dile/dile-spinner/dile-spinner-modal';
import { crcaLoadingPageSelector } from './redux/selectors.js';

crcaStore.addReducers({
  crcaLoading
});

export class CrcaReduxLoadingPage extends connect(crcaStore)(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.loading = false;
  }

  stateChanged(state) {
    this.loading=crcaLoadingPageSelector(state);
  }

  render() {
    return html`<dile-spinner-modal ?active="${this.loading}"></dile-spinner-modal>`;
  }
}
