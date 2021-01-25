import { CrcaAnimationBase } from './CrcaAnimationBase.js';

//Source animations http://daneden.github.io/animate.css
import { sliding_entrances } from './animations/sliding_entrances.js';

export class CrcaAnimationSlidingEntrances extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...sliding_entrances
    ];
  }

  constructor() {
    super();
    this.animation="slideInDown";
  }
}
