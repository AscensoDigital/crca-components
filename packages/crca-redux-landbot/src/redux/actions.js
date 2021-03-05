import { crcaUrlPageSelector } from '@ascenso/crca-redux-url-parser';
import { infoFeedback, negativeFeedback } from '@ascenso/crca-redux-feedback';
import { isDefined } from '@ascenso/crca-redux-firebase';
import {
  crcaLandbotActiveSelector,
  crcaLandbotBotHandleNodesSelector,
  crcaLandbotBotCustomerIdSelector,
  crcaLandbotConfigBotIdSelector,
  crcaLandbotConfigBotNodeSelector,
  crcaLandbotConfigBotTokenSelector,
  crcaLandbotBotHandleKeywordsSelector,
  crcaLandbotConfigBotKeywordSelector,
  crcaLandbotBotContextVarsSelector,
} from './selectors.js';

export const START_LANDBOT_LOAD = 'START_LANDBOT_LOAD';
export const FINISH_LANDBOT_LOAD = 'FINISH_LANDBOT_LOAD';
export const ACTIVATE_BOT = 'ACTIVATE_BOT';
export const DESACTIVATE_BOT = 'DESACTIVATE_BOT';
export const READY_BOT = 'READY_BOT';
export const SEND_VAR_BOT = 'SEND_VAR_BOT';
export const UPDATE_BOT_CUSTOMER_ID = 'UPDATE_BOT_CUSTOMER_ID';
export const UPDATE_BOT_NODE = 'UPDATE_BOT_NODE';
export const OPEN_BOT = 'OPEN_BOT';
export const CLOSE_BOT = 'CLOSE_BOT';
export const SET_BOTS_CONFIG = 'SET_BOTS_CONFIG';
export const DESTROY_BOT = 'DESTROY_BOT';
export const UPDATE_BOT_CONTEXT_VARS = 'UPDATE_CONTEXT_VARS';
export const UPDATE_BOT_KEYWORD = 'UPDATE_BOT_KEYWORD';

const _openBot = bot => ({
  type: OPEN_BOT,
  bot,
});

const _closeBot = bot => ({
  type: CLOSE_BOT,
  bot,
});

export const activateBot = bot => ({
  type: ACTIVATE_BOT,
  bot,
});

export const desactivateBot = bot => ({
  type: DESACTIVATE_BOT,
  bot,
});

export const destroyBot = bot => ({
  type: DESTROY_BOT,
  bot,
});

export const finishLandbotLoad = () => ({
  type: FINISH_LANDBOT_LOAD,
});

export const readyBot = (
  bot,
  id,
  opened,
  handleNodes,
  handleKeywords,
  contextVars
) => ({
  type: READY_BOT,
  detail: {
    bot,
    id,
    opened,
    handleNodes,
    handleKeywords,
    contextVars,
  },
});

export const sendVarBot = (bot, vars) => ({
  type: SEND_VAR_BOT,
  detail: {
    bot,
    vars,
  },
});

export const setBotsConfig = config => ({
  type: SET_BOTS_CONFIG,
  config,
});

export const startLandbotLoad = bot => ({
  type: START_LANDBOT_LOAD,
  bot,
});

export const updateBotContextVars = (bot, contextVars) => ({
  type: UPDATE_BOT_CONTEXT_VARS,
  detail: {
    bot,
    contextVars,
  },
});

export const updateBotCustomerId = (bot, customerId) => ({
  type: UPDATE_BOT_CUSTOMER_ID,
  detail: {
    bot,
    customerId,
  },
});

export const updateBotKeyword = (bot, keyword) => ({
  type: UPDATE_BOT_KEYWORD,
  detail: {
    bot,
    keyword,
  },
});

export const updateBotNode = (bot, node) => ({
  type: UPDATE_BOT_NODE,
  detail: {
    bot,
    node,
  },
});

export const closeBot = bot => (dispatch, getState) => {
  const state = getState();
  if (crcaLandbotActiveSelector(state) === bot) {
    dispatch(_closeBot(bot));
    dispatch(desactivateBot(bot));
    dispatch(sendVarBot(bot, {}));
  }
};

const sendNode = (bot, node, customerId, botId, botToken) => dispatch => {
  console.log('TODO: sendNode', bot, node, customerId, botId, botToken);
  // const url = `https://api.landbot.io/v1/customers/${customerId}/assign_bot/${botId}/`;
  /* const dataNode = {
    launch: true,
    node
  }
   const config = {
    headers: {"Authorization": `Token ${botToken}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
    }
  };

  // eslint-disable-next-line no-undef
  axios.put(url, dataNode, config)
  .then(rs => {
    console.log(rs);
    dispatch(updateBotNode(bot,node));
    dispatch(_openBot(bot));
  })
  .catch(e => {
    console.log(e);
    dispatch(infoFeedback(`No se pudo acceder al bot: ${bot}`))
  }); */

  // PARCHE
  console.log(botToken);
  const url = `https://restu.cl/ep/lb/nodo.php`;
  const dataNode = {
    lb_id: customerId,
    bot_id: botId,
    nodo: node,
  };
  // console.log(axios.defaults.headers.common);

  // Desactivación TEMPORAL de header Authentication en axios
  // eslint-disable-next-line no-undef
  const tmp = axios.defaults.headers.common;

  // eslint-disable-next-line no-undef
  axios.defaults.headers.common = { Accept: tmp.Accept };

  // eslint-disable-next-line no-undef
  axios
    .post(url, dataNode)
    .then(() => {
      // console.log(rs);
      dispatch(updateBotNode(bot, node));
      dispatch(_openBot(bot));
    })
    .catch(e => {
      console.log(e);
      dispatch(infoFeedback(`No se pudo acceder al bot: ${bot}`));
    });

  // Reactivacion header Authentication en axios
  // eslint-disable-next-line no-undef
  axios.defaults.headers.common = tmp;
};

export const openBot = (bot, action = '', data = {}) => (
  dispatch,
  getState
) => {
  const state = getState();
  const page = crcaUrlPageSelector(state);
  const handleNodes = crcaLandbotBotHandleNodesSelector(bot, state);
  const handleKeywords = crcaLandbotBotHandleKeywordsSelector(bot, state);
  const botToken = crcaLandbotConfigBotTokenSelector(bot, state);
  const contextVars = crcaLandbotBotContextVarsSelector(bot, state);

  let node = false;
  let keyword = false;

  if (isDefined(action)) {
    let error = false;
    if (handleNodes) {
      node = crcaLandbotConfigBotNodeSelector(bot, `${page}_${action}`, state);

      if (botToken === false) {
        dispatch(infoFeedback(`Token para el bot ${bot}, no configurado`));
        error = true;
      }

      if (node === false) {
        dispatch(
          infoFeedback(`Bot asistente para: ${page} ${action}, no configurado`)
        );
        error = true;
      }
    }

    if (handleKeywords && isDefined(action)) {
      keyword = `${page}_${action}`;
      const keywordLabel = crcaLandbotConfigBotKeywordSelector(
        bot,
        `${keyword}`,
        state
      );

      if (keywordLabel === false) {
        dispatch(
          infoFeedback(`Bot asistente para: ${page} ${action}, no configurado`)
        );
        error = true;
      }
    }

    if (error) {
      return;
    }
  }

  const vars = {
    ...contextVars,
    payload: {
      ...data,
    },
  };
  dispatch(sendVarBot(bot, vars));

  if (crcaLandbotActiveSelector(state) !== bot) {
    dispatch(activateBot(bot));
  }

  if (isDefined(action) && handleNodes) {
    const customerId = crcaLandbotBotCustomerIdSelector(bot, state);
    const botId = crcaLandbotConfigBotIdSelector(bot, state);
    if (customerId) {
      dispatch(sendNode(bot, node, customerId, botId, botToken));
    } else {
      // TODO: redirigir a home del bot para setear customer id
      dispatch(
        negativeFeedback(
          `Debes realizar la bienvenida en el bot para identificarte`
        )
      );
    }
  } else if (isDefined(action) && handleKeywords) {
    dispatch(_openBot(bot));
    dispatch(updateBotKeyword(bot, keyword));
  } else {
    dispatch(_openBot(bot));
  }
};
