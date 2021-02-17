export { CrcaUrlLoader } from './src/CrcaUrlLoader.js';

export { CrcaReduxUrlParser } from './src/CrcaReduxUrlParser.js';

export {
  PAGE_HOME,
  PAGE_LOGIN,
  PAGE_404
} from './src/page.js'

export {
  ENV_DEV,
  ENV_PROD
} from './src/consts.js'

export {
  decodeAnchor,
  decodeHostname,
  decodeSearch,
  decodeUrl,

  setDevSubdominio,
  setDominiosProd,
  setHomepage,
  setManualUpdate,
  setPageNotLast,
  setSubdominiosDev,

  updateAnchor,
  updateDominio,
  updatePage,
  updateSearch,
  updateSection,
  updateSubdominio,

  crcaLoadPage,
  crcaUrlHandleNavigation,
  crcaUrlNavigate
} from './src/redux/actions.js';

export {
  crcaUrlAnchorSelector,
  crcaUrlConfigSelector,
  crcaUrlDevSubdominioSelector,
  crcaUrlDominioSelector,
  crcaUrlDominiosProdSelector,
  crcaUrlEnvSelector,
  crcaUrlHomepageSelector,
  crcaUrlIsDominioProdSelector,
  crcaUrlIsHostProdSelector,
  crcaUrlIsSubdominioDevSelector,
  crcaUrlLastPageSelector,
  crcaUrlManualUpdateSelector,
  crcaUrlOfflineSelector,
  crcaUrlPageSelector,
  crcaUrlPageNotLastSelector,
  crcaUrlPageSectionSelector,
  crcaUrlSearchSelector,
  crcaUrlSectionParamsSelector,
  crcaUrlSubdominioSelector,
  crcaUrlSubdominiosDevSelector,
  isDomainProd,
  isSubdomainDev
} from './src/redux/selectors.js';

export {
  crcaUrl
} from './src/redux/reducer.js';