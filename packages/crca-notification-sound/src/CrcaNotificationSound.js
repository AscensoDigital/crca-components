import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { swing } from '@ascenso/crca-animation/src/animations/attention_seekers/swing.js';
import '@material/mwc-icon-button/mwc-icon-button';

export class CrcaNotificationSound extends LitElement {
  static get styles() {
    return [
      swing,
      css`
        .animated {
          animation-duration: var(--crca-notification-sound-animation-duration, 3s);
          animation-delay: var(--crca-notification-sound-animation-delay, 0);
          animation-fill-mode: both;
        }
        .circle {
          display: block;
          margin: 0 auto;
          text-align: center;
          border-radius: 50%;
          background: var(--crca-notification-sound-circle-color, red);
          color: var(--crca-notification-sound-circle-text-color, white);
          margin-top: var(--crca-notification-sound-circle-margin-top,-45px);
          margin-left: var(--crca-notification-sound-circle-margin-left,25px);
          width: var(--crca-notification-sound-circle-width,20px);
          height: var(--crca-notification-sound-circle-height,20px);
          font-size: var(--crca-notification-sound-circle-font-size,12px);
          font-weight: bold;
          line-height: var(--crca-notification-sound-circle-line-height,20px);
          z-index: 3;
        }

        .incoming {
          --mdc-icon-size: var(--crca-notification-sound-incoming-icon-size, 36px);
          color: var(--crca-notification-sound-incoming-color, green);
        }
      `
    ];
  }

  static get properties() {
    return {
      counter: { type: Number },
      icon: { type: String },
      iconIncoming: { type: String},
      incomingDuration: { type: Number },
      soundSrc: { type: String },
      _incoming: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.counter = 0;
    this.icon = 'notifications';
    this.iconIncoming = 'notifications_active';
    this.incomingDuration = 3000;
    this.soundSrc = '';
    this._incoming = false;
  }

  firstUpdated() {
    this.sound = document.getElementById('sound');
  }

  render() {
    return html`
      <mwc-icon-button
        class="${classMap(this._getClassMap())}"
        icon=${ this._incoming ? this.iconIncoming : this.icon}
        @click=${ this._click}
        ?disabled=${ this.counter===0 }
      ></mwc-icon-button>
      ${ !this._incoming && this.counter ? html `<div class="circle small">${this.counter}</div>` : ''}
      ${this.soundSrc.lenght
        ? html`<embed src="${this.soundSrc}" autostart="false" width="0" height="0" id="sound" enablejavascript="true">`
        : ''}
    `;
  }

  incoming() {
    this._incoming=true;
    if(this.sound) {
      this.sound.onplay();
    }
    setTimeout(() => { this._incoming=false }, this.incomingDuration);
  }

  _click(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('crca-notification-sound-click', {
      bubbles: true,
      composed: true,
    }));
  }

  _getClassMap() {
    return {
      animated: true,
      incoming: this._incoming,
      swing: this._incoming
    };
  }
}
