import { START_LOADING, STOP_LOADING } from "./actions.js"

const initialState = {
  page: [],
  element: [],
  internal: []
}

export const crcaLoading = (state = initialState, action) => {
  switch(action.type) {
    case START_LOADING:
      return {
        ...state,
        [action.payload.scope]: [...state[action.payload.scope], action.payload.process],
      };
    case STOP_LOADING:
      return {
        ...state,
        [action.payload.scope]: state[action.payload.scope].filter(p => p!==action.payload.process),
      };
    default:
      return state;
  }
}
