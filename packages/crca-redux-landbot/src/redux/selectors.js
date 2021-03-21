import { createSelector } from 'reselect';
import { crcaUrlEnvSelector } from '@ascenso/crca-redux-url-parser';
import { isDefined, isObject, isString } from '@ascenso/crca-utils';

const crcaLandbotStateSelector = state => (state && state.crcaLandbot) || {};

const crcaLandbotLoadSelector = createSelector(
  crcaLandbotStateSelector,
  lbot => lbot.load || {}
);

export const crcaLandbotLoadBySelector = createSelector(
  crcaLandbotLoadSelector,
  load => load.loadBy || ''
);

export const crcaLandbotLoadedSelector = createSelector(
  crcaLandbotLoadSelector,
  load => load.loaded || false
);

export const crcaLandbotActiveSelector = createSelector(
  crcaLandbotStateSelector,
  lbot => lbot.active || ''
);

const crcaLandbotBotsSelector = createSelector(
  crcaLandbotStateSelector,
  lbot => lbot.bots || {}
);

export const crcaLandbotBotActive = createSelector(
  crcaLandbotBotsSelector,
  crcaLandbotActiveSelector,
  (bots, active) => ({ ...bots[active], bot: active } || {})
);

export const crcaLandbotBotActiveKeywordSelector = createSelector(
  crcaLandbotBotActive,
  botActive =>
    (botActive.bot && { bot: botActive.bot, keyword: botActive.keyword }) || {}
);

export const crcaLandbotBotActiveOpenedSelector = createSelector(
  crcaLandbotBotActive,
  botActive =>
    (botActive.bot && { bot: botActive.bot, opened: botActive.opened }) || {}
);

export const crcaLandbotBotActiveVarsSelector = createSelector(
  crcaLandbotBotActive,
  botActive =>
    (botActive.bot && { bot: botActive.bot, vars: botActive.vars }) || {}
);

export const crcaLandbotBotContextVarsSelector = (bot, state) => {
  const bots = crcaLandbotBotsSelector(state);
  return (bots[bot] && bots[bot].contextVars) || {};
};

export const crcaLandbotBotCustomerIdSelector = (bot, state) => {
  const bots = crcaLandbotBotsSelector(state);
  return (bots[bot] && bots[bot].customerId) || false;
};

export const crcaLandbotBotHandleNodesSelector = (bot, state) => {
  const bots = crcaLandbotBotsSelector(state);
  return (bots[bot] && bots[bot].handleNodes) || false;
};

export const crcaLandbotBotHandleKeywordsSelector = (bot, state) => {
  const bots = crcaLandbotBotsSelector(state);
  return (bots[bot] && bots[bot].handleKeywords) || false;
};

export const crcaLandbotBotIdSelector = (bot, state) => {
  const bots = crcaLandbotBotsSelector(state);
  return (bots[bot] && bots[bot].id) || false;
};

export const crcaLandbotBotIsReadySelector = (bot, state) => {
  const bots = crcaLandbotBotsSelector(state);
  return (bots[bot] && bots[bot].ready) || false;
};

const crcaLandbotConfigSelector = createSelector(
  crcaLandbotStateSelector,
  lbot => lbot.config || {}
);

export const crcaLandbotConfigBotSelector = (bot, state) => {
  const config = crcaLandbotConfigSelector(state);
  return (config && config[bot]) || {};
};

const crcaLandbotConfigPropSelector = (bot, prop, state) => {
  const config = crcaLandbotConfigBotSelector(bot, state);
  const env = crcaUrlEnvSelector(state);

  return (
    (isString(config[prop]) && config[prop]) ||
    (isObject(config[prop]) && config[prop][env]) ||
    false
  );
};

export const crcaLandbotConfigBotIdSelector = (bot, state) =>
  crcaLandbotConfigPropSelector(bot, 'id', state);

export const crcaLandbotConfigBotKeywordSelector = (bot, keyword, state) => {
  const config = crcaLandbotConfigBotSelector(bot, state);
  return (config.keywords && config.keywords[keyword]) || false;
};

export const crcaLandbotConfigBotKeywordsSelector = (bot, state) => {
  const config = crcaLandbotConfigBotSelector(bot, state);
  return config.keywords || false;
};

export const crcaLandbotConfigBotTokenSelector = (bot, state) =>
  crcaLandbotConfigPropSelector(bot, 'token', state);

export const crcaLandbotConfigBotNodeSelector = (bot, slug, state) => {
  const config = crcaLandbotConfigBotSelector(bot, state);
  const env = crcaUrlEnvSelector(state);

  return (
    (config.nodes && isString(config.nodes[slug]) && config.nodes[slug]) ||
    (config.nodes && isObject(config.nodes[slug]) && config.nodes[slug][env]) ||
    false
  );
};

export const crcaLandbotConfigBotConfigSelector = (bot, state) => {
  const config = crcaLandbotConfigBotSelector(bot, state);
  const env = crcaUrlEnvSelector(state);

  return (
    (config.config && isDefined(config.config.configUrl) && config.config) ||
    (config.config && config.config[env]) ||
    false
  );
};
