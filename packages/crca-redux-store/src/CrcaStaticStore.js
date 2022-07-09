import { crcaStore } from "./crcaStore.js";

class CrcaPrivateStore {

  get store() {
    if(this.privateStore === undefined) {
      this.privateStore = crcaStore;
      console.log('CrcaPrivateStore: Usando store por defecto: crcaStore');
    }

    return this.privateStore;
  }


  set store(store) {
    if(this.privateStore === undefined) {
      this.privateStore = store;
    }
    else {
      console.log('CrcaPrivateStore.store: Ya Inicializado');
    }
  }

  get persistName() {
    if(this.privatePersistName === undefined) {
      this.privatePersistName = 'crca-persist-store';
    }
    return this.privatePersistName;
  }

  set persistName(persistName) {
    if(this.privatePersistName === undefined) {
      this.privatePersistName = persistName;
    }
    else {
      console.log('CrcaPrivatetore.persistName: Ya Inicializado');
    }
  }
}

// register globally so we can make sure there is only one
window.CrcaStaticStore = window.CrcaStaticStore || {};
window.CrcaStaticStore.requestAvailability = () => {
  if (!window.CrcaStaticStore.instance) {
    window.CrcaStaticStore.instance = new CrcaPrivateStore();
  }
  return window.CrcaStaticStore.instance;
};
export const CrcaStaticStore = window.CrcaStaticStore.requestAvailability();
