import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { isInViewportMixin } from '@ascenso/crca-utils';

import { crcaAnimationStyle } from './styles/crcaAnimationStyle.js';

export class CrcaAnimationBase extends isInViewportMixin(LitElement) {

  static get styles() {
    return [crcaAnimationStyle];
  }

  static get properties() {
    return {
      /* Nombre de animación opciones disponibles: 'bounce' | 'flash' | 'headShake' | 'heartBeat' | 'jello' | 'pulse' | 'rubberBand' | 'shake' | 'swing' |
      'tada' | 'wobble' | 'bounceInDown' | 'bounceIn' | 'bounceInLeft' | 'bounceInRight' | 'bounceInUp' | 'bounceOutDown' | 'bounceOut' | 'bounceOutLeft' |
      'bounceOutRight' | 'bounceOutUp' | 'fadeInDownBig' | 'fadeInDown' | 'fadeIn' | 'fadeInLeftBig' | 'fadeInLeft' | 'fadeInRightBig' | 'fadeInRight' |
      'fadeInUpBig' | 'fadeInUp' | 'fadeOutDownBig' | 'fadeOutDown' | 'fadeOut' | 'fadeOutLeftBig' | 'fadeOutLeft' | 'fadeOutRightBig' | 'fadeOutRight' |
      'fadeOutUpBig' | 'fadeOutUp' | 'flipInX' | 'flipInY' | 'flip' | 'flipOutX' | 'flipOutY' | 'lightSpeedIn' | 'lightSpeedOut' | 'rotateInDownLeft' |
      'rotateInDownRight' | 'rotateIn' | 'rotateInUpLeft' | 'rotateInUpRight' | 'rotateOutDownLeft' | 'rotateOutDownRight' | 'rotateOut' | 'rotateOutUpLeft' |
      'rotateOutUpRight' | 'slideInDown' | 'slideInLeft' | 'slideInRight' | 'slideInUp' | 'slideOutDown' | 'slideOutLeft' | 'slideOutRight' | 'slideOutUp' |
      'hinge' | 'jackInTheBox' | 'rollIn' | 'rollOut' | 'zoomInDown' | 'zoomIn' | 'zoomInLeft' | 'zoomInRight' | 'zoomInUp' | 'zoomOutDown' | 'zoomOut' |
      'zoomOutLeft' | 'zoomOutRight' | 'zoomOutUp'  */
      animation: { type: String },

      /**
       * Tipo de display del objeto a animar
       */
      displayInline: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.animation = 'bounce';
    this.displayInline = false;
  }

  firstUpdated() {
    this.detectFirstViewportAparition(this);
    this._IsInViewportHandler();
  }

  render() {
    return html`
      ${ this.displayInline
        ? html`<span class="${classMap(this._getClassMap())}"><slot></slot></span>`
        : html`<div class="${classMap(this._getClassMap())}"><slot></slot></div>`
      }
    `;
  }

  /**
   * Metodo Privado para obtener el map de clase de animación a aplicar
   */
  _getClassMap () {
    return {
      crcaAnimated: true,
      [this.animation]: this._appear
    }
  }
}
