import { CrcaAnimationBase } from './CrcaAnimationBase.js';

//Source animations http://daneden.github.io/animate.css
import { zooming_entrances } from './animations/zooming_entrances.js';

export class CrcaAnimationZoomingEntrances extends CrcaAnimationBase {
  static get styles() {
    return [
      super.styles,
      ...zooming_entrances
    ];
  }

  constructor() {
    super();
    this.animation="zoomIn";
  }
}
