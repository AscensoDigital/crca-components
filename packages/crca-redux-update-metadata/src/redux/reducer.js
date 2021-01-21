import { UPDATE_METADATA } from "./actions";

initialState = {
  metadata: null
}

export const crcaMetadata = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_METADATA:
      return {
        ...state,
        metadata: action.metadata
      };
    default:
      return state;
  }
}