import { CrcaAnimationBase } from './CrcaAnimationBase.js';

//Source animations http://daneden.github.io/animate.css
import { specials } from './animations/specials.js';

export class CrcaAnimationSpecials extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...specials
    ];
  }

  constructor() {
    super();
    this.animation="hinge";
  }
}
