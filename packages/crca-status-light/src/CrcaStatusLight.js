import { html, css, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { flash } from '@ascenso/crca-animation/src/animations/attention_seekers/flash.js';
import { crcaAnimationStyle } from '@ascenso/crca-animation/src/styles/crcaAnimationStyle.js';

import { CrcaStatusLightMixin } from './mixin/crca-status-light-mixin.js';

export class CrcaStatusLight extends CrcaStatusLightMixin(LitElement) {
  static get styles() {
    return [
      crcaAnimationStyle,
      flash,
      css`
      :host {
        display: inline-block;
      }
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: var(--crca-status-light-min-width, 14px);
        min-height: var(--crca-status-light-min-height, 14px);
        border-radius: var(--crca-status-light-border-radius, 14px);
        padding: var(--crca-status-light-padding, 5px);
        font-size: var(--crca-status-light-font-size, 12px);
        border-style: var(--crca-status-light-border-style, solid);
        border-width: var(--crca-status-light-border-width, 1px);
        color: var(--crca-status-light-default-color, #000);
        background-color: var(
          --crca-status-light-default-background-color,
          #e2e2e2
        );
        border-color: var(--crca-status-light-default-border-color, #6e6e6e);
      }
      div.success {
        color: var(--crca-status-light-success-color, #fff);
        background-color: var(--eit-badge-success-background-color, green);
        border-color: var(--crca-status-light-default-border-color, #08aa03);
      }
      div.warning {
        color: var(--crca-status-light-warning-color, #000);
        background-color: var(--eit-badge-warning-background-color, yellow);
        border-color: var(--crca-status-light-default-border-color, #f8e800);
      }
      div.danger {
        color: var(--crca-status-light-danger-color, #fff);
        background-color: var(--eit-badge-danger-background-color, red);
        border-color: var(--crca-status-light-default-border-color, #e60000);
      }
    `];
  }

  static get properties() {
    return {
      titleStatus: { type: String },
      valueAsContent: { type: Boolean },
      animated: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.titleStatus = '';
    this.valueAsContent = false;
    this.animated = false;
  }

  firstUpdated() {
    this.light = this.shadowRoot.getElementById('light');
    this.addEventListener('crca-status-light-change', this._changeStatus);
  }

  render() {
    return html`
      <div id="light" class="${classMap(this._lightClassMap)}" title="${this._titleStatus}">
        ${this.valueAsContent ? this.value : html`<slot></slot>`}
      </div>
    `;
  }

  get _lightClassMap() {
    if(this.status!=='')
    {
      return {
        [this.status]: true,
        crcaAnimated: this.animated,
        flash: this.animated
      }
    }
    return {};
  }

  get _titleStatus() {
    return this.titleStatus || this.getClass(this.value);
  }

  _changeStatus(e) {
    // console.log(e);
    if(e.detail.status!=='') {
      this.animated=true;
      setTimeout(() => {this.animated=false} , 3000);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('crca-status-light-change', this._changeStatus);
  }
}
