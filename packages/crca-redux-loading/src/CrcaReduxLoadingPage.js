import { html, css, LitElement } from 'lit';
import  { CrcaStaticStore } from '@ascenso/crca-redux-store';
import { connect } from 'pwa-helpers/connect-mixin'

import { crcaLoading } from './redux/reducer.js';
import { crcaLoadingPageSelector } from './redux/selectors.js';

import '@dile/dile-spinner/dile-spinner-modal';

CrcaStaticStore.store.addReducers({
  crcaLoading
});

export class CrcaReduxLoadingPage extends connect(CrcaStaticStore.store)(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      div {
        display: flex;
        position: fixed;
        background-color: var(
          --crca-redux-loading-page-background-color,
          rgba(255, 255, 255, 0.8)
        );
        height: 100vh;
        width: 100vw;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        z-index: 999999999999999;
      }
      blockquote {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        background-color: var(
          --crca-redux-loading-page-box-color,
          rgba(0, 0, 0, 0.9)
        );
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }

  static get properties() {
    return {
      img: { type: String },
      _loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.img=null;
    this._loading = false;
  }

  stateChanged(state) {
    this._loading=crcaLoadingPageSelector(state);
  }

  render() {
    return this.img
      ? html`${this._loading
        ? html` <div>
            <blockquote class="box">
              <img src="${this.img}" alt="Loading..." title="Loading...">
            </blockquote>
          </div>`
        : ""}`
      : html`<dile-spinner-modal ?active="${this._loading}"></dile-spinner-modal>`;
  }
}
