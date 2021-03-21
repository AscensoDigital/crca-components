import {
  READY_BOT,
  ACTIVATE_BOT,
  SEND_VAR_BOT,
  DESACTIVATE_BOT,
  UPDATE_BOT_CUSTOMER_ID,
  UPDATE_BOT_NODE,
  OPEN_BOT,
  CLOSE_BOT,
  SET_BOTS_CONFIG,
  DESTROY_BOT,
  START_LANDBOT_LOAD,
  FINISH_LANDBOT_LOAD,
  UPDATE_BOT_CONTEXT_VARS,
  UPDATE_BOT_KEYWORD,
  ADD_BOT_CONFIG,
} from './actions.js';

const initialState = {
  load: {
    loadBy: '',
    loaded: false,
  },
  bots: {},
  active: '',
  config: {},
};

export const crcaLandbot = (state = initialState, action) => {
  switch (action.type) {
    case START_LANDBOT_LOAD:
      return {
        ...state,
        load: {
          ...state.load,
          loadBy: action.bot,
        },
      };
    case FINISH_LANDBOT_LOAD:
      return {
        ...state,
        load: {
          ...state.load,
          loaded: true,
        },
      };
    case READY_BOT:
      return {
        ...state,
        bots: {
          ...state.bots,
          [action.detail.bot]: {
            ready: true,
            id: action.detail.id,
            opened: action.detail.opened,
            handleNodes: action.detail.handleNodes,
            handleKeywords: action.detail.handleKeywords,
            contextVars: action.detail.contextVars,
          },
        },
      };
    case ACTIVATE_BOT: {
      return {
        ...state,
        active: action.bot,
      };
    }
    case DESACTIVATE_BOT: {
      return {
        ...state,
        active: '',
      };
    }
    case SEND_VAR_BOT: {
      return {
        ...state,
        bots: {
          ...state.bots,
          [action.detail.bot]: {
            ...state.bots[action.detail.bot],
            vars: action.detail.vars,
          },
        },
      };
    }
    case OPEN_BOT: {
      return {
        ...state,
        bots: {
          ...state.bots,
          [action.bot]: {
            ...state.bots[action.bot],
            opened: true,
          },
        },
      };
    }
    case CLOSE_BOT: {
      return {
        ...state,
        bots: {
          ...state.bots,
          [action.bot]: {
            ...state.bots[action.bot],
            opened: false,
          },
        },
      };
    }
    case UPDATE_BOT_CONTEXT_VARS: {
      return {
        ...state,
        bots: {
          ...state.bots,
          [action.detail.bot]: {
            ...state.bots[action.detail.bot],
            contextVars: action.detail.contextVars,
          },
        },
      };
    }
    case UPDATE_BOT_CUSTOMER_ID: {
      return {
        ...state,
        bots: {
          ...state.bots,
          [action.detail.bot]: {
            ...state.bots[action.detail.bot],
            customerId: action.detail.customerId,
          },
        },
      };
    }
    case UPDATE_BOT_KEYWORD: {
      return {
        ...state,
        bots: {
          ...state.bots,
          [action.detail.bot]: {
            ...state.bots[action.detail.bot],
            keyword: action.detail.keyword,
          },
        },
      };
    }
    case UPDATE_BOT_NODE: {
      return {
        ...state,
        bots: {
          ...state.bots,
          [action.detail.bot]: {
            ...state.bots[action.detail.bot],
            node: action.detail.node,
          },
        },
      };
    }
    case SET_BOTS_CONFIG:
      return {
        ...state,
        config: action.config,
      };
    case ADD_BOT_CONFIG:
      return {
        ...state,
        config: {
          ...action.config,
          [action.payload.bot]: action.payload.config,
        },
      };
    case DESTROY_BOT:
      return {
        ...state,
        bots: {
          ...state.bots,
          [action.bot]: {},
        },
      };
    default:
      return state;
  }
};
