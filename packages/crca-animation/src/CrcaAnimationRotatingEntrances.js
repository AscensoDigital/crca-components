import { CrcaAnimationBase } from './CrcaAnimationBase.js';

// Source animations http://daneden.github.io/animate.css
import { rotating_entrances } from './animations/rotating_entrances.js';

export class CrcaAnimationRotatingEntrances extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...rotating_entrances
    ];
  }

  constructor() {
    super();
    this.animation="rotateIn";
  }
}
