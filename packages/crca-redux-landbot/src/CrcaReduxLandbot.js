import { LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';

import { CrcaStaticStore } from '@ascenso/crca-redux-store';
import { negativeFeedback } from '@ascenso/crca-redux-feedback';
import {
  crcaFirebaseRemoteConfigGet,
  existDiffObject,
  isDefined,
  isUndefined,
} from '@ascenso/crca-redux-firebase';

import { crcaLandbot } from './redux/reducer.js';

import {
  readyBot,
  closeBot,
  openBot,
  updateBotCustomerId,
  activateBot,
  destroyBot,
  startLandbotLoad,
  finishLandbotLoad,
  updateBotContextVars,
} from './redux/actions.js';

import {
  crcaLandbotBotActiveKeywordSelector,
  crcaLandbotBotActiveOpenedSelector,
  crcaLandbotBotActiveVarsSelector,
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
import { FB_RC_TYPE_VALUE_OBJECT } from '../../crca-redux-firebase/index.js';

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
      _activeKeyword: { type: Object },
      _activeOpened: { type: Object },
      _activeVars: { type: Object },
      _config: { type: Object },
      _botId: { type: String },
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
    this.type = 'livechat';
    this.open = false;
    this.manualCreate = false;
  }

  stateChanged(state) {
    this._landbotLoadBy = crcaLandbotLoadBySelector(state);
    this._landbotLoaded = crcaLandbotLoadedSelector(state);

    this._activeOpened = crcaLandbotBotActiveOpenedSelector(state);
    this._activeVars = crcaLandbotBotActiveVarsSelector(state);
    this._activeKeyword = crcaLandbotBotActiveKeywordSelector(state);
    this._config = crcaLandbotConfigBotConfigSelector(this.name, state);
    this._botId = crcaLandbotConfigBotIdSelector(this.name, state);
    this._isReady = crcaLandbotBotIsReadySelector(this.name, state);
  }

  createBot() {
    if (isDefined(this._config.configUrl)) {
      const config = {
        ...this._config,
        customData: this.contextVars,
      };
      switch (this.type) {
        case BOT_TYPE_CONTAINER:
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

        case BOT_TYPE_CONTAINER_POPUP:
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

    this._landbot.core.events.on('lb-send-customer-id', data => {
      // console.log("LB_SEND_CUSTOMER_ID",data);
      CrcaStaticStore.store.dispatch(
        updateBotCustomerId(this.name, data.customerId)
      );
    });

    this._landbot.core.events.on('new_message', function (message) {
      console.log('Message: ', message);
    });
  }

  _connectEventsOpenClose() {
    this._landbot.core.events.on('widget_open', () => {
      console.log(`Landbot chat "${this.name}" was opened!`);
      if (
        this._activeOpened.bot === undefined ||
        this._activeOpened.bot === this.name
      ) {
        if (
          this._activeOpened.opened === undefined ||
          !this._activeOpened.opened
        ) {
          CrcaStaticStore.store.dispatch(openBot(this.name));
        }
      }
    });

    this._landbot.core.events.on('widget_close', () => {
      console.log(`Landbot chat "${this.name}" was closed!`);
      CrcaStaticStore.store.dispatch(closeBot(this.name));
    });

    this._landbot.core.events.on('proactive_open', () => {
      console.log(`Proactive message chat "${this.name}" was opened!`);
    });

    this._landbot.core.events.on('proactive_close', () => {
      console.log(`Proactive message chat "${this.name}" was closed!`);
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
      CrcaStaticStore.store.dispatch(closeBot(this.name));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _loadedLandbot() {
    CrcaStaticStore.store.dispatch(finishLandbotLoad());
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
      CrcaStaticStore.store.dispatch(
        updateBotContextVars(this.name, this.contextVars)
      );
    }

    if (changedProperties.has('_activeVars')) {
      const preActiveVars = changedProperties.get('_activeVars');
      // console.log('CHANGE _activeVars ',preActiveVars, this._activeVars);
      if (
        this._activeVars.bot === this.name &&
        isDefined(this._activeVars.vars) &&
        existDiffObject(preActiveVars, this._activeVars)
      ) {
        // console.log('LB-SEND-VARS', this._activeVars.vars);
        // this._landbot.core.events.emit('lb-send-vars', this._activeVars.vars);

        // console.log('setCustomData', this._activeVars.vars);
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
          this._landbot.close();
        }
      }
      if (preActiveOpened.bot === this.name) {
        if (preActiveOpened.opened && isUndefined(this._activeOpened.opened)) {
          this._landbot.close();
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
        const botConfig = crcaFirebaseRemoteConfigGet(
          'bots',
          FB_RC_TYPE_VALUE_OBJECT
        )[this.name];
        const keywordLabel =
          botConfig.keywords[this._activeKeyword.keyword] ||
          this._activeKeyword.keyword;
        if (this._activeOpened.opened) {
          const msg = {
            type: 'button',
            message: `ir a ${keywordLabel}`,
            payload: `${this._activeKeyword.keyword}`,
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
