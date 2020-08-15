import { html, css, LitElement } from 'lit-element';
import { CrcaStatusLightMixin } from './mixin/crca-status-light-mixin.js';

export class CrcaStatusLight extends CrcaStatusLightMixin(LitElement) {
  static get styles() {
    return css`
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
    `;
  }

  static get properties() {
    return {
      titleStatus: { type: String },
      valueAsContent: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.titleStatus = '';
    this.valueAsContent = false;
  }

  render() {
    return html`
      <div class="${this.status}" title="${this._titleStatus}">
        ${this.valueAsContent ? this.value : html`<slot></slot>`}
      </div>
    `;
  }

  get _titleStatus() {
    return this.titleStatus || this.getClass(this.value);
  }
}
