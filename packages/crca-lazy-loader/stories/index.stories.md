```js script
import { html } from '@open-wc/demoing-storybook';
import '../crca-lazy-loader.js';

export default {
  title: 'CrcaLazyLoader',
  component: 'crca-lazy-loader',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# CrcaLazyLoader

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
npm install crca-lazy-loader
```

```js
import 'crca-lazy-loader/crca-lazy-loader.js';
```

```js preview-story
export const Simple = () => html`
  <crca-lazy-loader>
    Cargado directamente
    <div slot="secondary">Esto aparece finalizada la carga inicial de la página</div>
  </crca-lazy-loader>
`;
```
