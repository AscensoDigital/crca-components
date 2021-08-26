import { crcaStore } from "./crcaStore.js";

export class CrcaStaticStore {

  static get store() {
    if(CrcaStaticStore.privateStore === undefined) {
      CrcaStaticStore.privateStore = crcaStore;
      console.log('CrcaStaticStore: Usando store por defecto: crcaStore');
    }

    return CrcaStaticStore.privateStore;
  }

  static set store(store) {
    if(CrcaStaticStore.privateStore === undefined) {
      CrcaStaticStore.privateStore = store;
    }
    else {
      console.log('CrcaStaticStore.store: Ya Inicializado');
    }
  }

  static get persistName() {
    if(CrcaStaticStore.privatePersistName === undefined) {
      CrcaStaticStore.privatePersistName = 'crca-persist-store';
    }
    return CrcaStaticStore.privatePersistName;
  }

  static set persistName(persistName) {
    if(CrcaStaticStore.privatePersistName === undefined) {
      CrcaStaticStore.privatePersistName = persistName;
    }
    else {
      console.log('CrcaStaticStore.persistName: Ya Inicializado');
    }
  }
}