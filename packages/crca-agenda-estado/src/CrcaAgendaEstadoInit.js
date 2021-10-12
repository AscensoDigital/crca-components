import { html, css, LitElement } from 'lit';
import { connect } from 'pwa-helpers/connect-mixin';
import { store } from './redux/store.js';

import {
  initializeFirebase,
  loadEstados,
} from './redux/actions/app.actions.js';

// import '@dile/dile-modal/dile-modal';

export class CrcaAgendaEstadoInit extends connect(store)(LitElement) {
  static get styles() {
    return css`
      ul {
        list-style: none;
      }
      li {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      img {
        margin-right: 5px;
      }
    `;
  }

  static get properties() {
    return {
      firebaseConfig: { type: Object },
      url: { type: String },
      toastId: { type: String },
      _estados: { type: Array },
      _atencion: { type: Object },
      _opened: { type: Boolean },
    };
  }

  /**
   * Instance of the element is created/upgraded. Useful for initializing
   * state, set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
    this.firebaseConfig = {};
    this.toastId = '';
    this._opened = false;
    this._estados = [];
    this._atencion = {};
  }

  render() {
    return html`
      <dile-modal
        ?opened=${this._opened}
        showCloseIcon
        @dile-modal-closed=${this.close}
      >
        <h2>Cambiar Estado</h2>
        <ul>
          ${this._estados.length
            ? this._estados
                .filter(
                  estado =>
                    this._atencion.hasRut ||
                    (!this._atencion.hasRut &&
                      estado.id < this._atencion.llegoId)
                )
                .map(
                  estado => html` <li
                    @click=${this._cambiarEstado}
                    @keyup=${this._cambiarEstado}
                    estado-id="${estado.id}"
                  >
                    <img src="${estado.icon}" alt="${estado.nombre}" />
                    ${estado.nombre}
                  </li>`
                )
            : 'vacios'}
        </ul>
      </dile-modal>
    `;
  }

  firstUpdated() {
    store.dispatch(initializeFirebase(this.firebaseConfig));
    store.dispatch(loadEstados(this.url));
    document.addEventListener(
      'crca-agenda-estado-cambiar-estado',
      this._showEstados.bind(this)
    );
  }

  _cambiarEstado(e) {
    const toast = this.toastId.length
      ? document.getElementById(this.toastId)
      : undefined;
    const estadoId =
      e.target.getAttribute('estado-id') !== null
        ? e.target.getAttribute('estado-id')
        : e.target.parentNode.getAttribute('estado-id');

    // eslint-disable-next-line no-undef
    axios
      .post(this._atencion.urlEstado, {
        at: this._atencion.atencionId,
        estado: estadoId,
      })
      .then(response => {
        if (toast !== undefined) {
          toast.open('Cambio Estado OK', 'success');
        }
        if (response.data.llegada !== '') {
          const llegada = document
            .getElementById(`atencion-${this._atencion.atencionId}`)
            .getElementsByClassName('agenda-hora-llegada')[0];
          llegada.textContent = response.data.llegada;
        }
      })
      .catch(error => {
        if (toast !== undefined) {
          toast.open(`Nuevo estado, no guardado: ${error}`, 'error');
        }
      })
      .then(() => {
        this.close();
      });
  }

  close() {
    this._opened = false;
    this._atencion = {};
  }

  _showEstados(e) {
    this._atencion = e.detail;
    this._opened = true;
  }

  stateChanged(state) {
    if (state.app.estados !== undefined && this._estados.length === 0) {
      const object = state.app.estados.atencion;
      Object.keys(object).forEach(key =>
        this._estados.push({ ...object[key], id: key })
      );
      this.requestUpdate();
    }
  }
}
