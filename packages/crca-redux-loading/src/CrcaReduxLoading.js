import { html, css, LitElement } from 'lit-element';
import  { CrcaStaticStore } from '@ascenso/crca-redux-store';
import { connect } from 'pwa-helpers/connect-mixin';

import { crcaLoadingElementSelector } from './redux/selectors.js';

import '@dile/dile-spinner/dile-spinner-modal';
import '@material/mwc-circular-progress';

export class CrcaReduxLoading extends connect(CrcaStaticStore.store)(LitElement) {
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
      material: { type: Boolean },
      indeterminate: { type: Boolean },
      progress: { type: Number },
      density: { type: Number },
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.loading = false;
    this.material = false;
    this.indeterminate = false;
    this.progress=0;
    this.density=0;
  }

  stateChanged(state) {
    this.loading=crcaLoadingElementSelector(state);
  }

  render() {
    return this.material
      ? html`<mwc-circular-progress
              ?indeterminate=${this.indeterminate}
              .progress=${this.progress}
              .density=${this.density}
              ?closed=${!this.loading}
            ></mwc-circular-progress>`
      : html`<dile-spinner ?active="${this.loading}"></dile-spinner>`;
  }
}
