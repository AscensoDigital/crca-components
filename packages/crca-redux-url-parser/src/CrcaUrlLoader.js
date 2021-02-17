export class CrcaUrlLoader {

  static get subdominio() {
    if(CrcaUrlLoader.privateSubdominio === undefined) {
      return null;
    }

    return CrcaUrlLoader.privateSubdominio;
  }

  static set subdominio(callback) {
    CrcaUrlLoader.privateSubdominio = callback;
  }

  static get dominio() {
    if(CrcaUrlLoader.privateDominio === undefined) {
      return null;
    }

    return CrcaUrlLoader.privateDominio;
  }

  static set dominio(callback) {
    CrcaUrlLoader.privateDominio = callback;
  }

  static get page() {
    if(CrcaUrlLoader.privatePage === undefined) {
      return null;
    }

    return CrcaUrlLoader.privatePage;
  }

  static set page(callback) {
    CrcaUrlLoader.privatePage = callback;
  }

  static get section() {
    if(CrcaUrlLoader.privateSection === undefined) {
      return null;
    }

    return CrcaUrlLoader.privateSection;
  }

  static set section(callback) {
    CrcaUrlLoader.privateSection = callback;
  }

  static get search() {
    if(CrcaUrlLoader.privateSearch === undefined) {
      return null;
    }

    return CrcaUrlLoader.privateSearch;
  }

  static set search(callback) {
    CrcaUrlLoader.privateSearch = callback;
  }

  static get anchor() {
    if(CrcaUrlLoader.privateAnchor === undefined) {
      return null;
    }

    return CrcaUrlLoader.privateAnchor;
  }

  static set anchor(callback) {
    CrcaUrlLoader.privateAnchor = callback;
  }
}