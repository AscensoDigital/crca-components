import {
  UPDATE_ANCHOR,
  UPDATE_DOMINIO,
  UPDATE_LAST_PAGE,
  UPDATE_PAGE,
  UPDATE_SEARCH,
  UPDATE_SECTION,
  UPDATE_SUBDOMINIO
} from './actions.js';

const initialState = {
  anchor: '',
  dominio: '',
  lastPage: null,
  page: '',
  pageSection: '',
  sectionParams: [],
  searchs: {},
  subdominio: ''
}

export const crcaUrl = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_ANCHOR:
      return {
        ...state,
        anchor: action.anchor
      }
    case UPDATE_DOMINIO:
        return {
          ...state,
          dominio: action.dominio
        }
    case UPDATE_SEARCH:
      return {
        ...state,
        searchs: action.searchs
      };
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      }
    case UPDATE_LAST_PAGE:
      return {
        ...state,
        lastPage: action.lastPage
      }
    case UPDATE_SECTION:
      return {
        ...state,
        pageSection: action.pageSection,
        sectionParams: action.sectionParams
      }
    case UPDATE_SUBDOMINIO:
      return {
        ...state,
        subdominio: action.subdominio
      }
    default:
      return state;
  }
}
