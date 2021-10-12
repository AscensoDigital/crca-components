export const INIT_LOAD_ESTADOS = 'INIT_LOAD_ESTADOS';
export const SUCCESS_LOAD_ESTADOS = 'SUCCESS_LOAD_ESTADOS';

const initLoadEstados = () => ({ type: INIT_LOAD_ESTADOS });

const successLoadEstados = estados => ({
  type: SUCCESS_LOAD_ESTADOS,
  estados,
});

export const loadEstados = url => (dispatch, getState) => {
  const state = getState();
  if (state.app.estados === undefined) {
    dispatch(initLoadEstados());
    // eslint-disable-next-line no-undef
    axios.get(url).then(response => {
      dispatch(successLoadEstados(response.data));
    });
  }
};

export const INIT_FIREDB = 'INIT_FIREDB';

const initFiredb = firedb => ({
  type: INIT_FIREDB,
  firedb,
});

export const initializeFirebase = firebaseConfig => (dispatch, getState) => {
  const state = getState();
  if (state.app.firedb === undefined || state.app.firedb === null) {
    // eslint-disable-next-line no-undef
    firebase.initializeApp(firebaseConfig);
    // eslint-disable-next-line no-undef
    const db = firebase.firestore();
    dispatch(initFiredb(db));
  }
};

export const INIT_ATENCION = 'INIT_ATENCION';
export const UPDATE_ATENCION = 'UPDATE_ATENCION';
export const DISCONNECT_ATENCION = 'DISCONNECT_ATENCION';

const initAtencion = (atencionId, estados) => ({
  type: INIT_ATENCION,
  detail: {
    atencionId,
    estados,
  },
});

const updateAtencion = (atencionId, estados) => ({
  type: UPDATE_ATENCION,
  detail: {
    atencionId,
    estados,
  },
});

export const connectAtencion =
  (atencionId, estadosBase) => (dispatch, getState) => {
    dispatch(initAtencion(atencionId, estadosBase));

    const state = getState();
    const db = state.app.firedb;

    const unsubscribe = db
      .collection('atencion')
      .doc(atencionId)
      .onSnapshot(doc => {
        const data = doc.data();
        if (data !== undefined) {
          dispatch(updateAtencion(atencionId, data));
        }
      });
    return unsubscribe;
  };

export const disconnectAtencion = atencionId => ({
  type: DISCONNECT_ATENCION,
  atencionId,
});
