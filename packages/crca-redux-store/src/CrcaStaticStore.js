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
    }
    else {
      console.log('store ya definido');
    }
  }
}