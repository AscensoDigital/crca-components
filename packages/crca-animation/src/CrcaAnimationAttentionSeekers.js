import { CrcaAnimationBase } from './CrcaAnimationBase.js';

// Source animations http://daneden.github.io/animate.css
import { attention_seekers } from './animations/attention_seekers.js';

export class CrcaAnimationAttentionSeekers extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...attention_seekers
    ];
  }
}
