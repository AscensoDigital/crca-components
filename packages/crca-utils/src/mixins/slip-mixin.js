export const SlipMixin = Superclass =>
  class extends Superclass {

    static get properties() {
      return {
        initTouch: { type: Object },
        minimalSlip: { type: Number },
        movimiento: { type: Object },
      };
    }

    constructor() {
      super();
      this.initTouch = false;
      this.movimiento = {
        retrocederX: false,
        retrocederY: false,
        avanzarX: false,
        avanzarY: false,
        delta: 0
      };
      this._touchStartBind = this._touchStart.bind(this);
      this._touchEndBind = this._touchEnd.bind(this);
    }

    detectSlipTouch(elem, minimalSlip = 15) {
      this.minimalSlip = minimalSlip;
      elem.addEventListener('touchstart', this._touchStartBind);
      elem.addEventListener('touchend', this._touchEndBind);
    }

    _touchStart(e) {
      // e.preventDefault();
      this.initTouch = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
      this.movimiento = {
        retrocederX: false,
        retrocederY: false,
        avanzarX: false,
        avanzarY: false,
        delta: 0
      };
    }

    _touchEnd(e) {
      // e.preventDefault();
      if(this.initTouch!==false) {
        const lastX = e.changedTouches[0].clientX;
        const lastY = e.changedTouches[0].clientY;
        const deltaX = lastX - this.initTouch.x;
        const deltaY = lastY - this.initTouch.y;
        const horizontal = Math.abs(deltaX) > Math.abs(deltaY);

        if (horizontal) {
          if (deltaX > this.minimalSlip) { // Retroceder en x
            this.movimiento = {...this.movimiento, retrocederX: true, delta: deltaX};
            this._dispatchFinishedSlip();
          } else if (deltaX < -1*this.minimalSlip) { // Avanzar en x
            this.movimiento = {...this.movimiento, avanzarX: true, delta: deltaX};
            this._dispatchFinishedSlip();
          }
        } else if (deltaY > this.minimalSlip) { // Retroceder en y
          this.movimiento = {...this.movimiento, retrocederY: true, delta: deltaY};
          this._dispatchFinishedSlip();
        } else if (deltaY < -1*this.minimalSlip) { // Avanzar en y
          this.movimiento = {...this.movimiento, avanzarY: true, delta: deltaY};
          this._dispatchFinishedSlip();
        }
        this.initTouch = false;
      }
    }

    _dispatchFinishedSlip() {
      this.dispatchEvent(new CustomEvent('finished-slip', {
        bubbles: true,
        composed: true,
        detail: {
          ...this.movimiento
        }
      }));
    }

    /* updated(changedProperties) {
      if( changedProperties.has('movimiento') &&
          (this.movimiento.retrocederX || this.movimiento.retrocederY || this.movimiento.avanzarX || this.movimiento.avanzarY)
        ) {
        this.dispatchEvent(new CustomEvent('deslizar-mixin-execute', {
          bubbles: true,
          composed: true,
          detail: {
            ...this.movimiento
          }
        }));
      }
    } */
  };
