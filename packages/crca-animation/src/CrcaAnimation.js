import { CrcaAnimationBase } from './CrcaAnimationBase.js';

// Source animations http://daneden.github.io/animate.css
import { animations } from './animations.js';

export class CrcaAnimation extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...animations
    ];
  }
}
