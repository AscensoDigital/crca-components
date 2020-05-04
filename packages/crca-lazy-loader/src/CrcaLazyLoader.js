import { html, LitElement } from 'lit-element';

export class CrcaLazyLoader extends LitElement {
  static get properties() {
    return {
      lazyLoad: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.lazyLoad = false;
  }

  render() {
    return html`
      <slot></slot>
      ${this.lazyLoad ? html`<slot name="secondary"></slot>` : ''}
    `;
  }

  firstUpdated() {
    window.addEventListener('load', () => {
      this.lazyLoad = true;
    });
  }
}
