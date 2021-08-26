import { CrcaStaticStore } from "./CrcaStaticStore.js";

export const loadState = (key = null) => {
  try {
    const serializedData = localStorage.getItem(CrcaStaticStore.persistName)
    if (serializedData === null){
      return undefined // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
    }
    const state = JSON.parse(serializedData);
    return key!==null && state[key] ||  key===null && state || undefined // Si encontramos con exito nuestro storage lo devolvemos.
  } catch (error) {
    return undefined // Si ocurre algun error, devuelvo undefined para cargar el state inicial.
  }
}

export const saveState = (state) => {
  try {
    const serializedData = JSON.stringify(state);
    localStorage.setItem(CrcaStaticStore.persistName, serializedData)
  } catch (error) {
	 console.log('No se pudo guardar el state en localStorage');
  }
}