
export {
  setFirebaseAuthMethods,
  successFirebaseSignIn,
} from './src/redux/actions/auth-actions.js';

export {
  crcaFirebaseAuthHasMethodSelector,
  crcaFirebaseAuthHasMethodsSelector,
  crcaFirebaseAuthMethodSelector,
  crcaFirebaseAuthMethodsSelector,
  crcaFirebaseAuthSignInSelector,
  crcaFirebaseAuthSignInMethodSelector,
  crcaFirebaseAuthUserSelector,
  crcaFirebaseAuthUserUidSelector,
} from './src/redux/selectors/auth-selectors.js';

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
} from './src/consts.js';
