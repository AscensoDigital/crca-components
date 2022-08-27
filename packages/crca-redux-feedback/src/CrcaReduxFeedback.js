import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { CrcaStaticStore } from '@ascenso/crca-redux-store';
import { crcaFeedback } from './redux/reducer.js';
import { crcaFeedbackFeedbackSelector } from './redux/selectors.js';

import '@dile/dile-toast/dile-toast';

CrcaStaticStore.store.addReducers({
  crcaFeedback,
});

export class CrcaReduxFeedback extends connect(CrcaStaticStore.store)(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      @media (min-width: 500px) {
        dile-toast {
          --dile-toast-width: 450px;
          --dile-toast-padding: 15px 20px;
        }
      }
    `;
  }

  static get properties() {
    return {
      time: { type: Number },
      incomingMsg: { type: Object },
    };
  }

  constructor() {
    super();
    this.time = 5000;
  }

  firstUpdated() {
    this.toast = this.shadowRoot.getElementById('toast');
  }

  stateChanged(state) {
    this.incomingMsg = crcaFeedbackFeedbackSelector(state);
  }

  render() {
    return html` <dile-toast id="toast" duration=${this.time}></dile-toast> `;
  }

  changeIncomingMsg(feedbackMsg) {
    if (feedbackMsg && feedbackMsg.msg && feedbackMsg.status) {
      this.toast.open(feedbackMsg.msg, feedbackMsg.status);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('incomingMsg')) {
      this.changeIncomingMsg(this.incomingMsg);
    }
  }
}
