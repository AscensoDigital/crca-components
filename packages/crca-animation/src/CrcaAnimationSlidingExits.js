import { CrcaAnimationBase } from './CrcaAnimationBase.js';

// Source animations http://daneden.github.io/animate.css
import { sliding_exits } from './animations/sliding_exits.js';

export class CrcaAnimationSlidingExits extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...sliding_exits
    ];
  }

  constructor() {
    super();
    this.animation="slideOutDown";
  }
}
