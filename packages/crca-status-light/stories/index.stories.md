```js script
import { html } from '@open-wc/demoing-storybook';
import '../crca-status-light.js';

export default {
  title: 'CrcaStatusLight',
  component: 'crca-status-light',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# CrcaStatusLight

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add crca-status-light
```

```js
import 'crca-status-light/crca-status-light.js';
```

```js preview-story
export const Simple = () => html`
  <crca-status-light></crca-status-light>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <crca-status-light title="Hello World"></crca-status-light>
`;
```
