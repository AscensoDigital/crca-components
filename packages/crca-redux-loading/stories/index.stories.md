```js script
import { html } from '@open-wc/demoing-storybook';
import '../crca-redux-loading.js';

export default {
  title: 'CrcaReduxLoading',
  component: 'crca-redux-loading',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# CrcaReduxLoading

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add crca-redux-loading
```

```js
import 'crca-redux-loading/crca-redux-loading.js';
```

```js preview-story
export const Simple = () => html`
  <crca-redux-loading></crca-redux-loading>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <crca-redux-loading title="Hello World"></crca-redux-loading>
`;
```
