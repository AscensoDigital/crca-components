import { CrcaAnimationBase } from './CrcaAnimationBase.js';

// Source animations http://daneden.github.io/animate.css
import { bouncing_entrances } from './animations/bouncing_entrances.js';
import { fading_entrances } from './animations/fading_entrances.js'
import { rotating_entrances } from './animations/rotating_entrances.js';
import { sliding_entrances } from './animations/sliding_entrances.js';
import { zooming_entrances } from './animations/zooming_entrances.js';

export class CrcaAnimationEntrances extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...bouncing_entrances,
      ...fading_entrances,
      ...rotating_entrances,
      ...sliding_entrances,
      ...zooming_entrances
    ];
  }

  constructor() {
    super();
    this.animation="bounceIn";
  }
}
