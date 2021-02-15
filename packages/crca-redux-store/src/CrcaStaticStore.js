import { crcaStore } from "./crcaStore.js";

export class CrcaStaticStore {

  static get store() {
    if(CrcaStaticStore.privateStore === undefined) {
      CrcaStaticStore.privateStore = crcaStore;
    }

    return CrcaStaticStore.privateStore;
  }

  static set store(store) {
    if(CrcaStaticStore.privateStore === undefined) {
      CrcaStaticStore.privateStore = store;
      console.log('CrcaStaticStore: Usando store por defecto: crcaStore');
    }
    else {
      console.log('CrcaStaticStore: Ya Inicializado');
    }
  }
}