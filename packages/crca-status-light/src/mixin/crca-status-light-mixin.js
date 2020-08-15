export const CrcaStatusLightMixin = Superclass =>
  class extends Superclass {
    static get properties() {
      return {
        order: { type: String },
        value: { type: Number },
        success: { type: Number },
        warning: { type: Number },
        danger: { type: Number },
      };
    }

    constructor() {
      super();
      this.order = 'asc';
      this.success = null;
      this.warning = null;
      this.danger = null;
    }

    getClass(value) {
      const numeric = ['number', 'bigint'];
      if (numeric.indexOf(typeof value) === -1) {
        return '';
      }
      if (this.order === 'asc') {
        if (this.dander !== null && value <= this.danger) {
          return 'danger';
        }
        if (this.warning !== null && value <= this.warning) {
          return 'warning';
        }
        if (this.success !== null) {
          return 'success';
        }
      } else if (this.order === 'desc') {
        if (this.success !== null && value <= this.success) {
          return 'success';
        }
        if (this.warning !== null && value <= this.warning) {
          return 'warning';
        }
        if (this.danger !== null) {
          return 'danger';
        }
      }
      return '';
    }
  };
