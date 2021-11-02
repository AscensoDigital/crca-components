import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

import { CrcaStatusLightMixin } from '@ascenso/crca-status-light/src/mixin/crca-status-light-mixin.js';

import '@material/mwc-button';
import '@material/mwc-icon-button';

export class CrcaStepper extends CrcaStatusLightMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: inline-flex;
        --mdc-icon-size: var(--crca-stepper-icon-size, 0);
        --mdc-icon-button-size: var(--crca-stepper-icon-button-size, 48px);
      }
      div {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: space-between;
        padding: var(--crca-stepper-padding, 2px);
        min-width: var(--crca-stepper-min-width, 100px);
        max-width: var(--crca-stepper-max-width, 200px);
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
      mwc-icon-button {
        color: var(--mdc-theme-primary);
      }
      span {
        display: flex;
        box-sizing:border-box;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        min-width: var(--crca-stepper-value-min-width, 40px);
        max-width: var(--crca-stepper-value-max-width, 80px);
        flex-grow: 1;
        margin: var(--crca-stepper-value-margin, 0 5px);
        padding: var(--crca-stepper-value-padding, 0 5px);
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
      step: { type: Number },
      dense: { type: Boolean },
      raised: { type: Boolean },
      outlined: { type: Boolean },
      iconButton: { type: Boolean },
      iconDecrement: { type: String },
      iconLabelDecrement: { type: String },
      iconIncrement: { type: String },
      iconLabelIncrement: { type: String }
    };
  }

  constructor() {
    super();
    this.step = 1;
    this.min = null;
    this.max = null;
    this.label = "";
    this.dense = false;
    this.raised = false;
    this.outlined = false;
    this.iconButton = false;
    this.labelDecrement = "-";
    this.iconDecrement = ""
    this.labelIncrement = "+";
    this.iconIncrement = ""
  }

  render() {
    return html`
      <div class="${classMap(this._classMap)}">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        ${this.iconButton
          ?  html`<mwc-icon-button
                    .icon=${this.iconDecrement}
                    ?disabled=${this._canDecrement===false}
                    @click=${this._decrement}
                  >${this.labelDecrement}</mwc-icon-button>`
          : html`<mwc-button
                  ?dense=${this.dense}
                  ?raised=${this.raised}
                  ?outlined=${this.outlined}
                  ?disabled=${this._canDecrement===false}
                  @click=${this._decrement}
                  .icon=${this.iconDecrement}
                >${this.labelDecrement}</mwc-button>`
        }
        <span>${this.value}</span>
        ${this.iconButton
          ?  html`<mwc-icon-button
                    ?raised=${this.raised}
                    .icon=${this.iconIncrement}
                    ?disabled=${this._canIncrement===false}
                    @click=${this._increment}
                  >${this.labelIncrement}</mwc-icon-button>`
          : html`<mwc-button
                    ?dense=${this.dense}
                    ?raised=${this.raised}
                    ?outlined=${this.outlined}
                    ?disabled=${this._canIncrement===false}
                    @click=${this._increment}
                    .icon=${this.iconIncrement}
                  >${this.labelIncrement}</mwc-button>`
        }
      </div>
    `;
  }

  get _canDecrement() {
    const value = this.value===undefined ? 0 : this.value;
    const newValue = Number(value) - Number(this.step);
    if(this.min===null || newValue >= this.min) {
      return newValue;
    }
    return false;
  }

  get _canIncrement() {
    const value = this.value===undefined ? 0 : this.value;
    const newValue = Number(value) + Number(this.step);
    if(this.max===null || newValue <= this.max) {
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
