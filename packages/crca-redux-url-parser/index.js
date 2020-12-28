export { CrcaReduxUrlParser } from './src/CrcaReduxUrlParser.js';

export {
  PAGE_LOGIN,
  PAGE_404
} from './src/page.js'

export {
  decodeAnchor,
  decodeHostname,
  decodeSearch,
  decodeUrl,

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
  crcaUrlSearchSelector,
  crcaUrlSubdominioSelector
} from './src/redux/selectors.js';

export {
  crcaUrl
} from './src/redux/reducer.js';