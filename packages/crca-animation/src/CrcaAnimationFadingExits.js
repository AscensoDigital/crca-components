import { CrcaAnimationBase } from './CrcaAnimationBase.js';

// Source animations http://daneden.github.io/animate.css
import { fading_exits } from './animations/fading_exits.js';

export class CrcaAnimationFadingExits extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...fading_exits
    ];
  }

  constructor() {
    super();
    this.animation="fadeOut";
  }
}
