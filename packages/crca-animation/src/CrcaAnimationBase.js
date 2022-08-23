import { html, css, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map';

import { isInViewportMixin } from '@ascenso/crca-utils';

export class CrcaAnimationBase extends isInViewportMixin(LitElement) {

  static get styles() {
    return css`
      .animated {
        animation-duration: var(--crca-animation-animation-duration, 1s);
        animation-delay: var(--crca-animation-animation-delay, 0);
        animation-fill-mode: both;
      }
      @media (print), (prefers-reduced-motion: reduce) {
        .animated {
          animation-duration: 1ms !important;
          transition-duration: 1ms !important;
          animation-iteration-count: 1 !important;
        }
      }
      `;
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
      animated: true,
      [this.animation]: this._appear
    }
  }
}
