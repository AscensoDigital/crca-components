class CrcaUrlPrivateLoader {

  get subdominio() {
    if(this.privateSubdominio === undefined) {
      return null;
    }

    return this.privateSubdominio;
  }

  set subdominio(callback) {
    this.privateSubdominio = callback;
  }

  get dominio() {
    if(this.privateDominio === undefined) {
      return null;
    }

    return this.privateDominio;
  }

  set dominio(callback) {
    this.privateDominio = callback;
  }

  get page() {
    if(this.privatePage === undefined) {
      return null;
    }

    return this.privatePage;
  }

  set page(callback) {
    this.privatePage = callback;
  }

  get section() {
    if(this.privateSection === undefined) {
      return null;
    }

    return this.privateSection;
  }

  set section(callback) {
    this.privateSection = callback;
  }

  get search() {
    if(this.privateSearch === undefined) {
      return null;
    }

    return this.privateSearch;
  }

  set search(callback) {
    this.privateSearch = callback;
  }

  get anchor() {
    if(this.privateAnchor === undefined) {
      return null;
    }

    return this.privateAnchor;
  }

  set anchor(callback) {
    this.privateAnchor = callback;
  }
}

// register globally so we can make sure there is only one
window.CrcaUrlLoader = window.CrcaUrlLoader || {};
window.CrcaUrlLoader.requestAvailability = () => {
  if (!window.CrcaUrlLoader.instance) {
    window.CrcaUrlLoader.instance = new CrcaUrlPrivateLoader();
  }
  return window.CrcaUrlLoader.instance;
};
export const CrcaUrlLoader = window.CrcaUrlLoader.requestAvailability();
