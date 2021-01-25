import { CrcaAnimationBase } from './CrcaAnimationBase.js';

//Source animations http://daneden.github.io/animate.css
import { fading_entrances } from './animations/fading_entrances.js';

export class CrcaAnimationFadingEntrances extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...fading_entrances
    ];
  }

  constructor() {
    super();
    this.animation="fadeIn";
  }
}
