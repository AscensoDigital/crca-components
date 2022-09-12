class CrcaFirebasePrivateLoader {

  static get analytics() {
    if(this.privateAnalytics === undefined) {
      return null;
    }

    return this.privateAnalytics;
  }

  static set analytics(an) {
    this.privateAnalytics = an;
  }

  static get auth() {
    if(this.privateAuth === undefined) {
      return null;
    }

    return this.privateAuth;
  }

  static set auth(auth) {
    this.privateAuth = auth;
  }

  static get db() {
    if(this.privateDb === undefined) {
      return null;
    }

    return this.privateDb;
  }

  static set db(db) {
    this.privateDb = db;
  }

  static get firebase() {
    if(this.privateFirebase === undefined) {
      return null;
    }

    return this.privateFirebase;
  }

  static set firebase(fb) {
    this.privateFirebase = fb;
  }

  static get remoteConfig() {
    if(this.privateRemoteConfig === undefined) {
      return null;
    }

    return this.privateRemoteConfig;
  }

  static set remoteConfig(rc) {
    this.privateRemoteConfig = rc;
  }

  static get remoteConfigDefault() {
    if(this.privateRemoteConfigDefault === undefined) {
      return null;
    }

    return this.privateRemoteConfigDefault;
  }

  static set remoteConfigDefault(rcd) {
    this.privateRemoteConfigDefault = rcd;
  }
}

// register globally so we can make sure there is only one
window.CrcaFirebaseLoader = window.CrcaFirebaseLoader || {};
window.CrcaFirebaseLoader.requestAvailability = () => {
  if (!window.CrcaFirebaseLoader.instance) {
    window.CrcaFirebaseLoader.instance = new CrcaFirebasePrivateLoader();
  }
  return window.CrcaFirebaseLoader.instance;
};
export const CrcaFirebaseLoader = window.CrcaFirebaseLoader.requestAvailability();
