```js script
import { html } from '@open-wc/demoing-storybook';
import '../crca-stepper.js';

export default {
  title: 'CrcaStepper',
  component: 'crca-stepper',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# CrcaStepper

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add crca-stepper
```

```js
import 'crca-stepper/crca-stepper.js';
```

```js preview-story
export const Simple = () => html`
  <crca-stepper></crca-stepper>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <crca-stepper title="Hello World"></crca-stepper>
`;
```
