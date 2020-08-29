import { html, css, LitElement } from 'lit-element';
import  { crcaStore } from '@ascenso/crca-redux-store';
import { connect } from 'pwa-helpers/connect-mixin';

import '@dile/dile-spinner/dile-spinner-modal';
import { crcaLoadingElementSelector } from './redux/selectors.js';

export class CrcaReduxLoading extends connect(crcaStore)(LitElement) {
  static get styles() {
    return css`
      :host {
        display: inline;
        padding: var(--crca-redux-loading-padding, 3px);
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
    this.loading=crcaLoadingElementSelector(state);
  }

  render() {
    return html`<dile-spinner ?active="${this.loading}"></dile-spinner>`;
  }
}
