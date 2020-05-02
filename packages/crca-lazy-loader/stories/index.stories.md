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
yarn add crca-lazy-loader
```

```js
import 'crca-lazy-loader/crca-lazy-loader.js';
```

```js preview-story
export const Simple = () => html`
  <crca-lazy-loader></crca-lazy-loader>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <crca-lazy-loader title="Hello World"></crca-lazy-loader>
`;
```
