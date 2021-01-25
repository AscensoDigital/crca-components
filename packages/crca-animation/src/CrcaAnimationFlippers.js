import { CrcaAnimationBase } from './CrcaAnimationBase.js';

//Source animations http://daneden.github.io/animate.css
import { flippers } from './animations/flippers.js';

export class CrcaAnimationFlippers extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...flippers
    ];
  }

  constructor() {
    super();
    this.animation="flip";
  }
}
