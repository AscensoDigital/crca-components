import { CrcaAnimationBase } from './CrcaAnimationBase.js';

// Source animations http://daneden.github.io/animate.css
import { bouncing_entrances } from './animations/bouncing_entrances.js';

export class CrcaAnimationBouncingEntrances extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...bouncing_entrances
    ];
  }

  constructor() {
    super();
    this.animation="bounceIn";
  }
}
