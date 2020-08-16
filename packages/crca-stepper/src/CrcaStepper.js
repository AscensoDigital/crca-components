import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

import { CrcaStatusLightMixin } from '@ascenso/crca-status-light/src/mixin/crca-status-light-mixin.js';

import '@material/mwc-button';

export class CrcaStepper extends CrcaStatusLightMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }
      div {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: space-between;
        padding: 2px;
        min-width: var(--crca-stepper-width,100px);
        color: var(--crca-stepper-text-color, --mdc-theme-primary);
        border-radius: var(--crca-stepper-border-radius, 5px);
        border-width: var(--crca-stepper-border-width, 1px);
        border-style: var(--crca-stepper-border-style, solid);
        border-color: var(--crca-stepper-border-color, --mdc-theme-primary);
      }
      div.label {
        padding: 15px 5px 5px;
      }
      label {
        position: absolute;
        top: -8px;
        left: 5px;
        font-size: 0.8em;
        background-color: #fff;
        padding: 1px 2px;
      }
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        min-width: 50px;
        flex-grow: 1;
        margin: 0 5px;
        padding: 0 5px;
        user-select: none;
        border-radius: var(--crca-stepper-value-border-radius, 3px);
        border-width: var(--crca-stepper-value-border-width, 1px);
        border-style: var(--crca-stepper-value-border-style, solid);
        border-color: var(--crca-stepper-value-border-color, --mdc-theme-primary);
      }
    `;
  }

  static get properties() {
    return {
      label: { type: String },
      max: { type: Number },
      min: { type: Number },
      step: { type: Number }
    };
  }

  constructor() {
    super();
    this.step = 1;
    this.min=null;
    this.max=null;
    this.label="";
  }

  render() {
    return html`
      <div class="${classMap(this._classMap)}">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <mwc-button 
          ?disabled=${this._canDecrement===false}
          @click=${this._decrement}
        >-</mwc-button>
        <span>${this.value}</span>
        <mwc-button 
          ?disabled=${this._canIncrement===false}  
          @click=${this._increment}
        >+</mwc-button>
      </div>
    `;
  }

  get _canDecrement() {
    const value = this.value===undefined ? 0 : this.value;
    const newValue = value - this.step;
    if(this.min===null || newValue >= this.min) {
      return newValue;
    }
    return false;
  }

  get _canIncrement() {
    const value = this.value===undefined ? 0 : this.value;
    const newValue = value + this.step;
    if(this.min===null || newValue >= this.min) {
      return newValue;
    }
    return false;
  }

  get _classMap() {
    return { label: this.label!=="" };
  }

  _changeValue() {
    this.dispatchEvent(new CustomEvent('crca-stepper-change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value
      }
    }));
  }

  _decrement() {
    const newValue = this._canDecrement;
    if(newValue!==false) {
      this.value = newValue;
      this._changeValue();
    }
  }

  _increment() {
    const newValue = this._canIncrement;
    if(newValue!==false) {
      this.value = newValue;
      this._changeValue();
    }
  }
}
