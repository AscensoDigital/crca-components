import { html, fixture, expect } from '@open-wc/testing';

import '../crca-status-light.js';

describe('CrcaStatusLight', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture(html` <crca-status-light></crca-status-light> `);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture(html` <crca-status-light></crca-status-light> `);
    el.shadowRoot.querySelector('button').click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture(html`
      <crca-status-light title="attribute title"></crca-status-light>
    `);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html` <crca-status-light></crca-status-light> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
