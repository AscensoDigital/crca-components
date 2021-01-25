import { CrcaAnimationBase } from './CrcaAnimationBase.js';

//Source animations http://daneden.github.io/animate.css
import { zooming_exits } from './animations/zooming_exits.js';

export class CrcaAnimationZoomingExits extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...zooming_exits
    ];
  }

  constructor() {
    super();
    this.animation="zoomOut";
  }
}
