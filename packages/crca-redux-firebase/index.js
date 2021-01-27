export { CrcaReduxFirebase } from './src/CrcaReduxFirebase.js';

export {
  setFirebaseAuthMethods,
  setFirebaseConfigDev,
  setFirebaseConfigProd,
  successFirebaseSignIn,
  crcaFirebaseRemoteConfigGet,
  crcaFirebaseRemoteConfigGetAll,
  crcaFirebaseGet,
} from './src/redux/actions.js';

export { crcaFirebase } from './src/redux/reducer.js';

export {
  crcaFirebaseAuthHasMethodSelector,
  crcaFirebaseAuthHasMethodsSelector,
  crcaFirebaseAuthMethodSelector,
  crcaFirebaseAuthMethodsSelector,
  crcaFirebaseAuthSignInSelector,
  crcaFirebaseAuthSignInMethodSelector,
  crcaFirebaseAuthUserSelector,
  crcaFirebaseAuthUserUidSelector,
  crcaFirebaseInitSelector,
  crcaFirebaseRemoteConfigInitSelector,
  crcaFirebaseRemoteConfigConfigSelector,
  crcaFirebaseRemoteConfigLastFetchSelector,
  crcaFirebaseRemoteConfigGetSelector,
} from './src/redux/selectors.js';

export {
  FILTRO_TYPE_BOOLEAN,
  FILTRO_TYPE_ENTITY,
  FILTRO_TYPE_STRING,
  ORDER_ASC,
  ORDER_DESC,
  dataViewGenerate,
  dataViewGet,
  dateFirebase2Js,
  decodeField,
  existDiffObject,
  filterData,
  filterAndSortData,
  isBoolean,
  isDefined,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
  joinParts,
  sortData,
  stringifyPropValue,
} from './src/utils/data-view-util.js';

export {
  FB_AUTH_EMAIL,
  FB_AUTH_TELEFONO,
  FB_AUTH_GOOGLE,
  FB_AUTH_PLAY_JUEGOS,
  FB_AUTH_GAME_CENTER,
  FB_AUTH_FACEBOOK,
  FB_AUTH_TWITTER,
  FB_AUTH_GITHUB,
  FB_AUTH_YAHOO,
  FB_AUTH_MICROSOFT,
  FB_AUTH_APPLE,
  FB_AUTH_ANONYMOUSLY,
  FB_RC_TYPE_VALUE_BOOLEAN,
  FB_RC_TYPE_VALUE_NUMBER,
  FB_RC_TYPE_VALUE_OBJECT,
  FB_RC_TYPE_VALUE_STRING,
  FB_RC_TYPE_VALUE_VALUE,
} from './src/consts.js';

export {
  getQueryCollectionByProp,
  getQueryCollectionByPropSorted,
  getQueryCollectionSorted,
} from './src/utils/repository.js';
