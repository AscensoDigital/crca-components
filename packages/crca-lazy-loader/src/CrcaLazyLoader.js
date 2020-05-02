import { html, css, LitElement } from 'lit-element';

export class CrcaLazyLoader extends LitElement {

  static get properties() {
    return {
      firstUpdate: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.firstUpdate = false;
  }

  render() {
    return html`
      <slot></slot>
      ${this.firstUpdate ? html`<slot name="secondary"></slot>` : ''}
    `;
  }

  firstUpdated() {
    this.firstUpdate=true;
  }
}
