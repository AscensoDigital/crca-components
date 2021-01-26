import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';

import { crcaStore } from '@ascenso/crca-redux-store/crcaStore';
import { negativeFeedback } from '@ascenso/crca-redux-feedback';
import {
  existDiffObject,
  isDefined,
  isUndefined,
} from '@ascenso/crca-redux-firebase';

import {
  readyBot,
  closeBot,
  updateBotCustomerId,
  activateBot,
  destroyBot,
  startLandbotLoad,
  finishLandbotLoad,
} from './redux/actions.js';

import {
  crcaLandbotBotActiveOpenedSelector,
  crcaLandbotBotActiveVarsSelector,
  // botContextSelector,
  crcaLandbotBotIsReadySelector,
  crcaLandbotConfigBotConfigSelector,
  crcaLandbotConfigBotIdSelector,
  crcaLandbotLoadBySelector,
  crcaLandbotLoadedSelector,
} from './redux/selectors.js';

import {
  BOT_TYPE_CONTAINER,
  BOT_TYPE_CONTAINER_POPUP,
  BOT_TYPE_FULLPAGE,
  BOT_TYPE_LIVECHAT,
  BOT_TYPE_NATIVE,
  BOT_TYPE_POPUP,
} from './consts.js';

export class CrcaReduxLandbot extends connect(crcaStore)(LitElement) {
  static get properties() {
    return {
      handleNodes: { type: Boolean },
      initVars: { type: Object },
      name: { type: String },
      type: { type: String },
      open: { type: Boolean },
      _activeOpened: { type: Object },
      _activeVars: { type: Object },
      _config: { type: Object },
      _botId: { type: String },
      _landbot: { type: Object },
      _isReady: { type: Boolean },
      _landbotLoadBy: { type: String },
      _landbotLoaded: { type: Boolean },
      // _context: { type: Object },
    };
  }

  constructor() {
    super();
    this.handleNodes = false;
    this.initVars = {};
    this.type = 'livechat';
    this.open = false;
  }

  stateChanged(state) {
    this._landbotLoadBy = crcaLandbotLoadBySelector(state);
    this._landbotLoaded = crcaLandbotLoadedSelector(state);

    this._activeOpened = crcaLandbotBotActiveOpenedSelector(state);
    this._activeVars = crcaLandbotBotActiveVarsSelector(state);

    this._config = crcaLandbotConfigBotConfigSelector(this.name, state);
    this._botId = crcaLandbotConfigBotIdSelector(this.name, state);
    this._isReady = crcaLandbotBotIsReadySelector(this.name, state);
    // this._context = botContextSelector(state);
  }

  render() {
    return html`
      ${this._landbotLoadBy === this.name
        ? html`<script
            SameSite="None; Secure"
            defer
            async
            @load=${this._loadedLandbot}
            src="https://static.landbot.io/landbot-3/landbot-3.0.0.js"
          ></script>`
        : ''}
    `;
  }

  _connectEvents() {
    this._landbot.onLoad(() =>
      crcaStore.dispatch(
        readyBot(this.name, this._botId, this.open, this.handleNodes)
      )
    );

    this._landbot.core.events.on('lb-send-customer-id', data => {
      // console.log("LB_SEND_CUSTOMER_ID",data);
      crcaStore.dispatch(updateBotCustomerId(this.name, data.customerId));
    });
  }

  _connectEventsOpenClose() {
    this._landbot.core.events.on('widget_open', () => {
      console.log('Landbot chat was opened!');
    });

    this._landbot.core.events.on('widget_close', () =>
      crcaStore.dispatch(closeBot(this.name))
    );

    this._landbot.core.events.on('proactive_open', () => {
      console.log('Proactive message was opened!');
    });

    this._landbot.core.events.on('proactive_close', () => {
      console.log('Livechat proactive message was closed!');
    });

    this._landbot.core.events.on('lb-navigate', data => {
      // console.log("LB_NAVIGATE",data);
      this.dispatchEvent(
        new CustomEvent('crca-redux-landbot-navigate', {
          bubbles: true,
          composed: true,
          detail: {
            url: data.url,
          },
        })
      );
      crcaStore.dispatch(closeBot(this.name));
    });
  }

  _createBot() {
    if (isDefined(this._config.configUrl)) {
      const config = {
        ...this._config,
        customData: this.initVars,
      };
      switch (this.type) {
        case BOT_TYPE_CONTAINER:
          if (isDefined(config.container)) {
            // eslint-disable-next-line no-undef
            this._landbot = new Landbot.Container(config);
          } else {
            crcaStore.dispatch(
              negativeFeedback(
                `Config "Container" es Obligatorio para bot ${this.name}`
              )
            );
          }
          break;

        case BOT_TYPE_CONTAINER_POPUP:
          if (isDefined(config.container)) {
            // eslint-disable-next-line no-undef
            this._landbot = new Landbot.ContainerPopup(config);
          } else {
            crcaStore.dispatch(
              negativeFeedback(
                `Config "Container" es Obligatorio para bot ${this.name}`
              )
            );
          }
          break;

        case BOT_TYPE_FULLPAGE:
          // eslint-disable-next-line no-undef
          this._landbot = new Landbot.Fullpage(config);
          break;

        case BOT_TYPE_LIVECHAT:
          // eslint-disable-next-line no-undef
          this._landbot = new Landbot.Livechat(config);
          this._connectEventsOpenClose();
          break;

        case BOT_TYPE_NATIVE:
          // eslint-disable-next-line no-undef
          this._landbot = new Landbot.Native(config);
          break;

        case BOT_TYPE_POPUP:
          // eslint-disable-next-line no-undef
          this._landbot = new Landbot.Popup(config);
          this._connectEventsOpenClose();
          break;

        default:
          crcaStore.dispatch(
            negativeFeedback(
              `Type: "${this.type}" no disponible para bot ${this.name}`
            )
          );
          break;
      }
      if (isDefined(this._landbot)) {
        this._connectEvents();
      }
    } else {
      crcaStore.dispatch(
        negativeFeedback(`No configurado configUrl para bot ${this.name}`)
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _loadedLandbot() {
    crcaStore.dispatch(finishLandbotLoad());
  }

  updated(changedProperties) {
    if (this._landbotLoadBy === '') {
      crcaStore.dispatch(startLandbotLoad(this.name));
    }

    if (
      this._landbotLoaded &&
      this._config &&
      (changedProperties.has('_landbotLoaded') ||
        changedProperties.has('_config'))
    ) {
      this._createBot();
    }

    if (changedProperties.has('_isReady') && this._isReady && this.open) {
      crcaStore.dispatch(activateBot(this.name));
    }

    /* if( this._isReady &&
        (changedProperties.has('_isReady') || changedProperties.has('_context'))
    ) {
      // console.log('LB-SEND-CONTEXT',this._context);
      this._landbot.core.events.emit('lb-send-context', this._context);

    } */

    if (changedProperties.has('_activeVars')) {
      const preActiveVars = changedProperties.get('_activeVars');
      // console.log('CHANGE _activeVars ',preActiveVars, this._activeVars);
      if (
        this._activeVars.bot === this.name &&
        isDefined(this._activeVars.vars) &&
        existDiffObject(preActiveVars, this._activeVars.vars)
      ) {
        // console.log('LB-SEND-VARS', this._activeVars.vars);
        this._landbot.core.events.emit('lb-send-vars', this._activeVars.vars);
      }
    }

    if (changedProperties.has('_activeOpened')) {
      const preActiveOpened = changedProperties.get('_activeOpened');
      // console.log('CHANGE _activeOpened ',preActiveOpened, this._activeOpened);
      if (this._activeOpened.bot === this.name) {
        if (this._activeOpened.opened) {
          this._landbot.open();
        } else if (preActiveOpened.opened) {
          this._landbot.close();
        }
      }
      if (preActiveOpened.bot === this.name) {
        if (preActiveOpened.opened && isUndefined(this._activeOpened.opened)) {
          this._landbot.close();
        }
      }
    }
  }

  /**
   * Called every time the element is removed from the DOM. Useful for
   * running clean up code (removing event listeners, etc.).
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._landbot.destroy();
    crcaStore.dispatch(destroyBot(this.name));
    this._landbot = undefined;
  }
}
