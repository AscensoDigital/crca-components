import { CrcaAnimationBase } from './CrcaAnimationBase.js';

// Source animations http://daneden.github.io/animate.css
import { bouncing_exits } from './animations/bouncing_exits.js';
import { fading_exits } from './animations/fading_exits.js'
import { rotating_exits } from './animations/rotating_exits.js';
import { sliding_exits } from './animations/sliding_exits.js';
import { zooming_exits } from './animations/zooming_exits.js';

export class CrcaAnimationExits extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...bouncing_exits,
      ...fading_exits,
      ...rotating_exits,
      ...sliding_exits,
      ...zooming_exits
    ];
  }

  constructor() {
    super();
    this.animation="bounceOut";
  }
}
