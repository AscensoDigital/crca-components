import { html, LitElement } from 'lit-element';

export class CrcaLazyLoader extends LitElement {
  static get properties() {
    return {
      lazyLoad: { type: Boolean },
      notLoadLazy: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.lazyLoad = false;
    this.notLoadLazy = false;
  }

  render() {
    return html`
      <slot></slot>
      ${this.lazyLoad ? html`<slot name="secondary"></slot>` : ''}
    `;
  }

  firstUpdated() {
    window.addEventListener('load', () => {
      if (this.notLoadLazy === false) {
        this.lazyLoad = true;
      }
    });
  }
}
