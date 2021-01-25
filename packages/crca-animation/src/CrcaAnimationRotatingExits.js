import { CrcaAnimationBase } from './CrcaAnimationBase.js';

//Source animations http://daneden.github.io/animate.css
import { rotating_exits } from './animations/rotating_exits.js';

export class CrcaAnimationRotatingExits extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...rotating_exits
    ];
  }

  constructor() {
    super();
    this.animation="rotateOut";
  }
}
