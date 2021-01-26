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
  crcaUrlLastPageSelector,
  crcaUrlManualUpdateSelector,
  crcaUrlPageSelector,
  crcaUrlPageNotLastSelector,
  crcaUrlPageSectionSelector,
  crcaUrlSearchSelector,
  crcaUrlSectionParamsSelector,
  crcaUrlSubdominioSelector,
  isDomainProd
} from './src/redux/selectors.js';

export {
  crcaUrl
} from './src/redux/reducer.js';