import { SEND_FEEDBACK } from './actions.js';

const initialState = {
  feedback: null,
};

export const crcaFeedback = (state = initialState, action) => {
  switch (action.type) {
    case SEND_FEEDBACK:
      return {
        ...state,
        feedback: action.feedback,
      };
    default:
      return state;
  }
};
