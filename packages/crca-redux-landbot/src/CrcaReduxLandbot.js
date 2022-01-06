import { LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';

import { CrcaStaticStore } from '@ascenso/crca-redux-store';
import { negativeFeedback } from '@ascenso/crca-redux-feedback/redux';
import { existDiffObject, isDefined, isUndefined, sendErrorDiscord } from '@ascenso/crca-utils';

import { crcaLandbot } from './redux/reducer.js';

import {
  readyBot,
  crcaLandbotClose,
  crcaLandbotOpen,
  updateBotCustomerId,
  activateBot,
  destroyBot,
  startLandbotLoad,
  finishLandbotLoad,
  updateBotContextVars,
  crcaLandbotAddBotConfig,
  errorLandbotLoad,
} from './redux/actions.js';

import {
  crcaLandbotBotActiveKeywordSelector,
  crcaLandbotBotActiveOpenedSelector,
  crcaLandbotBotActiveVarsSelector,
  crcaLandbotBotIsReadySelector,
  crcaLandbotConfigBotConfigSelector,
  crcaLandbotConfigBotIdSelector,
  crcaLandbotConfigBotKeywordsSelector,
  crcaLandbotLoadBySelector,
  crcaLandbotLoadedSelector,
  crcaLandbotConfigBotInitKeywordSelector,
} from './redux/selectors.js';

import {
  CRCA_LANDBOT_TYPE_CONTAINER,
  CRCA_LANDBOT_TYPE_CONTAINER_POPUP,
  CRCA_LANDBOT_TYPE_FULLPAGE,
  CRCA_LANDBOT_TYPE_LIVECHAT,
  CRCA_LANDBOT_TYPE_NATIVE,
  CRCA_LANDBOT_TYPE_POPUP,
} from './consts.js';

CrcaStaticStore.store.addReducers({
  crcaLandbot,
});

export class CrcaReduxLandbot extends connect(CrcaStaticStore.store)(
  LitElement
) {
  static get properties() {
    return {
      handleNodes: { type: Boolean },
      handleKeywords: { type: Boolean },
      contextVars: { type: Object },
      manualCreate: { type: Boolean },
      name: { type: String },
      type: { type: String },
      open: { type: Boolean },
      botConfig: { type: Object },
      discordUrl: { type: String },
      _activeKeyword: { type: Object },
      _activeOpened: { type: Object },
      _activeVars: { type: Object },
      _config: { type: Object },
      _botId: { type: String },
      _initKeyword: { type: String},
      _kewords: { type: Array },
      _landbot: { type: Object },
      _isReady: { type: Boolean },
      _landbotLoadBy: { type: String },
      _landbotLoaded: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.handleNodes = false;
    this.handleKeywords = false;
    this.contextVars = {};
    this.type = CRCA_LANDBOT_TYPE_LIVECHAT;
    this.open = false;
    this.manualCreate = false;
    this.botConfig = null;
    this.discordUrl = '';
  }

  stateChanged(state) {
    this._landbotLoadBy = crcaLandbotLoadBySelector(state);
    this._landbotLoaded = crcaLandbotLoadedSelector(state);
    this._activeOpened = crcaLandbotBotActiveOpenedSelector(state);
    this._activeVars = crcaLandbotBotActiveVarsSelector(state);
    this._activeKeyword = crcaLandbotBotActiveKeywordSelector(state);
    this._config = crcaLandbotConfigBotConfigSelector(this.name, state);
    this._botId = crcaLandbotConfigBotIdSelector(this.name, state);
    this._initKeyword = crcaLandbotConfigBotInitKeywordSelector(this.name, state);
    this._keywords = crcaLandbotConfigBotKeywordsSelector(this.name, state);
    this._isReady = crcaLandbotBotIsReadySelector(this.name, state);
  }

  createBot() {
    if (isDefined(this._config.configUrl)) {
      const config = {
        ...this._config,
        customData: this.contextVars,
      };
      switch (this.type) {
        case CRCA_LANDBOT_TYPE_CONTAINER:
          if (isDefined(config.container)) {
            // eslint-disable-next-line no-undef
            this._landbot = new Landbot.Container(config);
          } else {
            CrcaStaticStore.store.dispatch(
              negativeFeedback(
                `Config "Container" es Obligatorio para bot ${this.name}`
              )
            );
          }
          break;

        case CRCA_LANDBOT_TYPE_CONTAINER_POPUP:
          if (isDefined(config.container)) {
            // eslint-disable-next-line no-undef
            this._landbot = new Landbot.ContainerPopup(config);
          } else {
            CrcaStaticStore.store.dispatch(
              negativeFeedback(
                `Config "Container" es Obligatorio para bot ${this.name}`
              )
            );
          }
          break;

        case CRCA_LANDBOT_TYPE_FULLPAGE:
          // eslint-disable-next-line no-undef
          this._landbot = new Landbot.Fullpage(config);
          break;

        case CRCA_LANDBOT_TYPE_LIVECHAT:
          // eslint-disable-next-line no-undef
          this._landbot = new Landbot.Livechat(config);
          this._connectEventsOpenClose();
          break;

        case CRCA_LANDBOT_TYPE_NATIVE:
          // eslint-disable-next-line no-undef
          this._landbot = new Landbot.Native(config);
          break;

        case CRCA_LANDBOT_TYPE_POPUP:
          // eslint-disable-next-line no-undef
          this._landbot = new Landbot.Popup(config);
          this._connectEventsOpenClose();
          break;

        default:
          CrcaStaticStore.store.dispatch(
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
      CrcaStaticStore.store.dispatch(
        negativeFeedback(`No configurado configUrl para bot ${this.name}`)
      );
    }
  }

  _connectEvents() {
    this._landbot.onLoad(() =>
      CrcaStaticStore.store.dispatch(
        readyBot(
          this.name,
          this._botId,
          this.open,
          this.handleNodes,
          this.handleKeywords,
          this.contextVars
        )
      )
    );

    this._landbot.core.events.on("init", () => {
      if (this._initKeyword!==false) {
        this._landbot.sendMessage({ type: 'hidden', payload: `#${this._initKeyword}` });
      }
    });

    this._landbot.core.events.on('lb-custom-event', (event, payload) => {
      this.dispatchEvent(
        new CustomEvent('crca-landbot-custom-event', {
          bubbles: true,
          composed: true,
          detail: {
            event,
            payload,
          },
        })
      );
    });

    this._landbot.core.events.on('lb-send-customer-id', data => {
      // console.log("LB_SEND_CUSTOMER_ID",data);
      CrcaStaticStore.store.dispatch(
        updateBotCustomerId(this.name, data.customerId)
      );
    });

    this._landbot.core.events.on('new_message', message => {
      // console.log('Message: ', message);
      this.dispatchEvent(
        new CustomEvent('crca-landbot-new-message', {
          bubbles: true,
          composed: true,
          detail: {
            name: this.name,
            message,
          },
        })
      );
    });
  }

  _connectEventsOpenClose() {
    this._landbot.core.events.on('widget_open', () => {
      if (
        this._activeOpened.bot === undefined ||
        this._activeOpened.bot === this.name
      ) {
        if (
          this._activeOpened.opened === undefined ||
          !this._activeOpened.opened
        ) {
          CrcaStaticStore.store.dispatch(crcaLandbotOpen(this.name));
          console.log(`widget_open dispatch action crcaLandbotOpen`);
        } else {
          console.log(`widget_open Landbot chat "${this.name}" was opened!`);
          this.dispatchEvent(
            new CustomEvent('crca-landbot-open', {
              bubbles: true,
              composed: true,
              detail: {
                name: this.name,
              },
            })
          );
        }
      } else {
        console.log('evento open no procesado', this.name);
      }
    });

    this._landbot.core.events.on('widget_close', () => {
      if (
        this._activeOpened.bot === undefined ||
        this._activeOpened.bot === this.name
      ) {
        if (
          this._activeOpened.opened === undefined ||
          this._activeOpened.opened
        ) {
          console.log('widget_close dispatch action crcaLandbotClose');
          CrcaStaticStore.store.dispatch(crcaLandbotClose(this.name));
        }
        console.log(`widget_close Landbot chat "${this.name}" was closed!`);
        this.dispatchEvent(
          new CustomEvent('crca-landbot-close', {
            bubbles: true,
            composed: true,
            detail: {
              name: this.name,
            },
          })
        );
      } else {
        console.log('evento close no procesado', this.name);
      }
    });

    this._landbot.core.events.on('proactive_open', e => {
      // console.log(e);
      this.dispatchEvent(
        new CustomEvent('crca-landbot-proactive-open', {
          bubbles: true,
          composed: true,
          detail: {
            name: this.name,
          },
        })
      );
      // console.log(`Proactive message chat "${this.name}" was opened!`);
    });

    this._landbot.core.events.on('proactive_close', e => {
      // console.log(e);
      this.dispatchEvent(
        new CustomEvent('crca-landbot-proactive-close', {
          bubbles: true,
          composed: true,
          detail: {
            name: this.name,
          },
        })
      );
      // console.log(`Proactive message chat "${this.name}" was closed!`);
    });

    this._landbot.core.events.on('lb-navigate', data => {
      // console.log("LB_NAVIGATE",data);
      this.dispatchEvent(
        new CustomEvent('crca-landbot-navigate', {
          bubbles: true,
          composed: true,
          detail: {
            name: this.name,
            url: data.url,
          },
        })
      );
      CrcaStaticStore.store.dispatch(crcaLandbotClose(this.name));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _loadedLandbot(e) {
    // eslint-disable-next-line no-undef
    if(Landbot!==undefined) {
      CrcaStaticStore.store.dispatch(finishLandbotLoad());
    }
    else {
      CrcaStaticStore.store.dispatch(errorLandbotLoad());
      CrcaStaticStore.store.dispatch(
        negativeFeedback(`No se cargo Correctamente Landbot`)
      );
      console.log(e);
      if(this.discordUrl!=='') {
        const data = {
          location: window.location,
          userAgent: window.navigator.userAgent,
          info: {
            botName: this.name,
            botConfig: this.botConfig,
            contextVars: this.contextVars,
            config: this._config,
          }
        };
        sendErrorDiscord(this.discordUrl,e,data, 'loadedLandbot');
      }
    }
  }

  _loadLandbot() {
    const script = document.createElement('script');
    script.src = 'https://static.landbot.io/landbot-3/landbot-3.0.0.js';
    script.SameSite = 'None; Secure';
    script.onload = this._loadedLandbot;
    document.body.append(script);
  }

  updated(changedProperties) {
    if (this._landbotLoadBy === '') {
      CrcaStaticStore.store.dispatch(startLandbotLoad(this.name));
      this._loadLandbot();
    }

    if (
      (changedProperties.has('botConfig') || changedProperties.has('name')) &&
      isDefined(this.name) &&
      isDefined(this.botConfig)
    ) {
      CrcaStaticStore.store.dispatch(
        crcaLandbotAddBotConfig(this.name, this.botConfig)
      );
    }

    if (
      this.manualCreate === false &&
      this._landbotLoaded &&
      this._config &&
      isDefined(this._config.configUrl) &&
      (changedProperties.has('_landbotLoaded') ||
        changedProperties.has('_config'))
    ) {
      this.createBot();
    }

    if (changedProperties.has('_isReady') && this._isReady && this.open) {
      CrcaStaticStore.store.dispatch(activateBot(this.name));
    }

    if (this._isReady && changedProperties.has('contextVars')) {
      const preContextVars = changedProperties.get('contextVars');
      if(existDiffObject(preContextVars, this.contextVars)) {
        // console.log('UPDATE CONTEXT_VARS');
        CrcaStaticStore.store.dispatch(
          updateBotContextVars(this.name, this.contextVars)
        );
      }
    }

    if (changedProperties.has('_activeVars')) {
      const preActiveVars = changedProperties.get('_activeVars');
      // console.log('CHANGE _activeVars ',preActiveVars, this._activeVars);
      if (
        this._activeVars.bot === this.name &&
        isDefined(this._activeVars.vars) &&
        existDiffObject(preActiveVars, this._activeVars)
      ) {
        /* Envio de variables mediante evento
        console.log('LB-SEND-VARS', this._activeVars.vars);
        this._landbot.core.events.emit('lb-send-vars', this._activeVars.vars); */
        if(this._activeVars.vars.env===undefined || this._activeVars.vars.env!=='prod') {
          console.log('setCustomData', this._activeVars.vars);
        }
        this._landbot.setCustomData(this._activeVars.vars);
      }
    }

    if (changedProperties.has('_activeOpened')) {
      const preActiveOpened = changedProperties.get('_activeOpened');
      // console.log('CHANGE _activeOpened ',preActiveOpened, this._activeOpened);
      if (this._activeOpened.bot === this.name) {
        if (this._activeOpened.opened) {
          this._landbot.open();
        } else if (preActiveOpened.opened) {
          console.log('Cierro bot desde UPDATED activeOpened');
          this._landbot.close();
        }
      }
      if (preActiveOpened.bot === this.name) {
        if (preActiveOpened.opened && isUndefined(this._activeOpened.opened)) {
          this._landbot.close();
          console.log('Cierro bot desde UPDATED PREactiveOpened');
        }
      }
    }

    if (this.handleKeywords && changedProperties.has('_activeKeyword')) {
      const preActiveKeyword = changedProperties.get('_activeKeyword');
      // console.log('CHANGE _activeKeyword ',preActiveKeyword, this._activeKeyword);
      if (
        this._activeKeyword.bot === this.name &&
        isDefined(this._activeKeyword.keyword) &&
        existDiffObject(preActiveKeyword, this._activeKeyword)
      ) {
        const keywordLabel =
          this._keywords[this._activeKeyword.keyword] ||
          this._activeKeyword.keyword || false;
        if (this._activeOpened.opened && keywordLabel!==false) {
          const msg = keywordLabel===true
            ? {
              type: 'hidden',
              payload: `#${this._activeKeyword.keyword}`,
            }
            : {
              type: 'button',
              message: `${keywordLabel}`,
              payload: `#${this._activeKeyword.keyword}`,
            };
          this._landbot.sendMessage(msg);
          console.log(msg);
        } else {
          console.log('_activeKeyword: bot aun cerrado');
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
    CrcaStaticStore.store.dispatch(destroyBot(this.name));
    this._landbot = undefined;
  }
}
