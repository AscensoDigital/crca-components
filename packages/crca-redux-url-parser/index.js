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
  crcaUrlLastPageSelector,
  crcaUrlPageSelector,
  crcaUrlPageSectionSelector,
  crcaUrlSearchsSelector,
  crcaUrlSectionParamsSelector,
  crcaUrlSubdominioSelector
} from './src/redux/selectors.js';

export {
  crcaUrl
} from './src/redux/reducer.js';