export { CrcaReduxUrlParser } from './src/CrcaReduxUrlParser.js';

export {
  PAGE_HOME,
  PAGE_LOGIN,
  PAGE_404
} from './src/page.js'

export {
  decodeAnchor,
  decodeHostname,
  decodeSearch,
  decodeUrl,

  setDominiosProd,
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
  crcaUrlDominioSelector,
  crcaUrlDominiosProdSelector,
  crcaUrlIsDominioProdSelector,
  crcaUrlLastPageSelector,
  crcaUrlPageSelector,
  crcaUrlPageSectionSelector,
  crcaUrlSearchSelector,
  crcaUrlSectionParamsSelector,
  crcaUrlSubdominioSelector,
  isDomainProd
} from './src/redux/selectors.js';

export {
  crcaUrl
} from './src/redux/reducer.js';