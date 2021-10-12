import { html, css, LitElement } from 'lit';
import { connect } from 'pwa-helpers/connect-mixin';

import { store } from './redux/store.js';
import {
  connectAtencion,
  disconnectAtencion,
} from './redux/actions/app.actions.js';

export class CrcaAgendaEstado extends connect(store)(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1px;
      }
      img.active {
        cursor: pointer;
      }
      img.disabled {
        opacity: 0.8;
      }
      span {
        margin-top: 5px;
        background-color: #ffc107;
        border-radius: 30%;
        padding: 4px 4px;
        text-align: center;
        font-size: 0.8em;
      }
      span.online {
        background-color: #f58700;
      }
    `;
  }

  static get properties() {
    return {
      atencionId: { type: String },
      estadosBase: { type: Object },
      hasRut: { type: Boolean },
      online: { type: Boolean },
      urlEstado: { type: String },
      urlEstadoDoctor: { type: String },
      llegoId: { type: Number },
      toastId: { type: String },
      _atencion: { type: Object },
      _estadoAtencion: { type: Object },
      _estadoDoctor: { type: Object },
    };
  }

  /**
   * Instance of the element is created/upgraded. Useful for initializing
   * state, set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
    this.hasRut = false;
    this.online = false;
    this.urlEstado = '';
    this.urlEstadoDoctor = '';
    this.llegoId = 3;
    this.toastId = '';
  }

  /**
   * Called every time the element is inserted into the DOM. Useful for
   * running setup code, such as fetching resources or rendering.
   * Generally, you should try to delay work until this time.
   */
  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.dispatch(
      connectAtencion(this.atencionId, this.estadosBase)
    );
  }

  /**
   * Called every time the element is removed from the DOM. Useful for
   * running clean up code (removing event listeners, etc.).
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    store.dispatch(disconnectAtencion(this.atencionId));
    this.unsubscribe();
  }

  get imgEstado() {
    return html`<img
      src="${this._estadoAtencion.icon}"
      alt="${this._estadoAtencion.nombre}"
      class="${this.activaEstado ? 'active' : 'disabled'}"
    />`;
  }

  get imgEstadoDoctor() {
    return html`<img
      src="${this._estadoDoctor.icon}"
      alt="${this._estadoDoctor.nombre}"
      class="${this.activaEstadoDoctor(this._atencion) ? 'active' : 'disabled'}"
    />`;
  }

  render() {
    return html`
      <div>
        ${this._estadoAtencion
          ? html` ${this.activaEstado
              ? html`<button
                  title="Cambiar Estado"
                  @click=${this.cambiarEstado}
                >
                  ${this.imgEstado}
                </button>`
              : this.imgEstado}`
          : ''}
        ${!this.hasRut
          ? html`<span title="Entrar a opción editar y registrar el rut"
              >Ingrese rut del paciente</span
            >`
          : ''}
        ${this.online
          ? html`<span
              title="Asegurar de confirmar reserva realizada en la web"
              class="online"
              >Online</span
            >`
          : ''}
      </div>
      <div>
        ${this._estadoDoctor
          ? html` ${this.activaEstadoDoctor(this._atencion)
              ? html`<button
                  title="Cambiar Estado Profesional"
                  @click=${this.cambiarEstadoDoctor}
                >
                  ${this.imgEstadoDoctor}
                </button>`
              : this.imgEstadoDoctor}`
          : ''}
        ${this.showSolicitaLlego(this._atencion)
          ? html`<span title="Pedir a secretaria que marque llegó a paciente"
              >Solicitar llegada</span
            >`
          : ''}
      </div>
    `;
  }

  get activaEstado() {
    return this.urlEstado.length > 0;
  }

  activaEstadoDoctor() {
    return this.urlEstadoDoctor.length > 0 && this.llego();
  }

  cambiarEstado(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('crca-agenda-estado-cambiar-estado', {
        bubbles: true,
        composed: true,
        detail: {
          atencionId: this.atencionId,
          hasRut: this.hasRut,
          llegoId: this.llegoId,
          urlEstado: this.urlEstado,
        },
      })
    );
  }

  cambiarEstadoDoctor(e) {
    e.preventDefault();

    const toast = this.toastId.length
      ? document.getElementById(this.toastId)
      : undefined;

    // eslint-disable-next-line no-undef
    axios
      .post(this.urlEstadoDoctor, { atencionId: this.atencionId })
      .then(() => {
        if (toast !== undefined) {
          toast.open('Cambio Estado Doctor OK', 'success');
        }
      })
      .catch(error => {
        if (toast !== undefined) {
          toast.open(`Nuevo estado doctor, no guardado: ${error}`, 'error');
        }
      });
  }

  llego() {
    return this.llegoId !== undefined && this._atencion.estado >= this.llegoId;
  }

  showSolicitaLlego() {
    return this.urlEstadoDoctor.length > 0 && !this.llego();
  }

  stateChanged(state) {
    this._atencion = state.app.atenciones[this.atencionId] || this._atencion;

    if (state.app.estados !== undefined && this._atencion !== undefined) {
      this._estadoAtencion =
        state.app.estados.atencion &&
        state.app.estados.atencion[this._atencion.estado];
      this._estadoDoctor =
        state.app.estados.doctor &&
        state.app.estados.doctor[this._atencion.estadoDoctor];
    }
  }
}
