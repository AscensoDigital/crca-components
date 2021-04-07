export class CrcaFirebaseLoader {

  static get firebase() {
    if(CrcaFirebaseLoader.privateFirebase === undefined) {
      return null;
    }

    return CrcaFirebaseLoader.privateFirebase;
  }

  static set firebase(fb) {
    CrcaFirebaseLoader.privateFirebase = fb;
  }

  static get remoteConfig() {
    if(CrcaFirebaseLoader.privateRemoteConfig === undefined) {
      return null;
    }

    return CrcaFirebaseLoader.privateRemoteConfig;
  }

  static set remoteConfig(rc) {
    CrcaFirebaseLoader.privateRemoteConfig = rc;
  }
}