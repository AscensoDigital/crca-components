import {
  INIT_LOAD_ESTADOS,
  INIT_FIREDB,
  SUCCESS_LOAD_ESTADOS,
  INIT_ATENCION,
  UPDATE_ATENCION,
  DISCONNECT_ATENCION,
} from '../actions/app.actions.js';

const INITIAL_STATE = {
  atenciones: {},
  firedb: null,
  loading: false,
};

const app = (state = INITIAL_STATE, action) => {
  let tmp = {};
  switch (action.type) {
    case INIT_LOAD_ESTADOS:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_LOAD_ESTADOS:
      return {
        ...state,
        loading: false,
        estados: action.estados,
      };
    case INIT_FIREDB:
      return {
        ...state,
        firedb: action.firedb,
      };

    case INIT_ATENCION:
      return {
        ...state,
        atenciones: {
          ...state.atenciones,
          [action.detail.atencionId]: action.detail.estados,
        },
      };
    case UPDATE_ATENCION:
      return {
        ...state,
        atenciones: {
          ...state.atenciones,
          [action.detail.atencionId]: action.detail.estados,
        },
      };
    case DISCONNECT_ATENCION:
      tmp = { ...state.atenciones };
      delete tmp[action.atencionId];
      return {
        ...state,
        atenciones: tmp,
      };
    default:
      return state;
  }
};

export default app;
