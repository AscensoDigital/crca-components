import { createSelector } from 'reselect';
import { crcaUrlEnvSelector } from '@ascenso/crca-redux-url-parser';
import { isDefined, isObject, isString } from '@ascenso/crca-redux-firebase';

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

const crcaLandbotConfigPropSelector = (bot, prop, state) => {
  const config = crcaLandbotConfigSelector(state);
  const env = crcaUrlEnvSelector(state);

  return (
    (config[bot] && isString(config[bot][prop]) && config[bot][prop]) ||
    (config[bot] && isObject(config[bot][prop]) && config[bot][prop][env]) ||
    false
  );
};

export const crcaLandbotConfigBotIdSelector = (bot, state) =>
  crcaLandbotConfigPropSelector(bot, 'id', state);

export const crcaLandbotConfigBotKeywordSelector = (bot, keyword, state) => {
  const config = crcaLandbotConfigSelector(state);
  return (
    (config[bot] && config[bot].keywords && config[bot].keywords[keyword]) ||
    false
  );
};

export const crcaLandbotConfigBotTokenSelector = (bot, state) =>
  crcaLandbotConfigPropSelector(bot, 'token', state);

export const crcaLandbotConfigBotNodeSelector = (bot, slug, state) => {
  const config = crcaLandbotConfigSelector(state);
  const env = crcaUrlEnvSelector(state);

  return (
    (config[bot] &&
      config[bot].nodes &&
      isString(config[bot].nodes[slug]) &&
      config[bot].nodes[slug]) ||
    (config[bot] &&
      config[bot].nodes &&
      isObject(config[bot].nodes[slug]) &&
      config[bot].nodes[slug][env]) ||
    false
  );
};

export const crcaLandbotConfigBotConfigSelector = (bot, state) => {
  const config = crcaLandbotConfigSelector(state);
  const env = crcaUrlEnvSelector(state);

  return (
    (config[bot] &&
      config[bot].config &&
      isDefined(config[bot].config.configUrl) &&
      config[bot].config) ||
    (config[bot] && config[bot].config && config[bot].config[env]) ||
    false
  );
};
