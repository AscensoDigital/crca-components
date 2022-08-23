import { CrcaAnimationBase } from './CrcaAnimationBase.js';

// Source animations http://daneden.github.io/animate.css
import { bouncing_exits } from './animations/bouncing_exits.js';

export class CrcaAnimationBouncingExits extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...bouncing_exits
    ];
  }

  constructor() {
    super();
    this.animation="bounceOut";
  }
}
