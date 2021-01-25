import { CrcaAnimationBase } from './CrcaAnimationBase.js';

//Source animations http://daneden.github.io/animate.css
import { lightspeed } from './animations/lightspeed.js';

export class CrcaAnimationLightspeed extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...lightspeed
    ];
  }

  constructor() {
    super();
    this.animation="lightSpeedIn";
  }
}
