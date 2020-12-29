import { PAGE_HOME, PAGE_NOT_LAST } from '../page.js';
import {
  SET_DEV_SUBDOMINIO,
  SET_DOMINIOS_PROD,
  SET_HOMEPAGE,
  SET_MANUAL_UPDATE,
  SET_PAGE_NOT_LAST,
  UPDATE_ANCHOR,
  UPDATE_DOMINIO,
  UPDATE_LAST_PAGE,
  UPDATE_PAGE,
  UPDATE_SEARCH,
  UPDATE_SECTION,
  UPDATE_SUBDOMINIO
} from './actions.js';


const initialConfigState = {
  devSubdominio: '',
  dominiosProd: [],
  homepage: PAGE_HOME,
  manualUpdate: {
    anchor: false,
    dominio: false,
    page: false,
    section: false,
    search: false,
    subdominio: false,
  },
  pageNotLast: PAGE_NOT_LAST,
};

const crcaUrlConfig = (state = initialConfigState, action) => {
  switch(action.type) {
    case SET_DEV_SUBDOMINIO:
      return {
        ...state,
        devSubdominio: action.devSubdominio
      };
    case SET_DOMINIOS_PROD:
      return {
        ...state,
        dominiosProd: action.dominiosProd
      };
    case SET_HOMEPAGE:
      return {
        ...state,
        homepage: action.homepage
      };
    case SET_MANUAL_UPDATE:
      return {
        ...state,
        manualUpdate: action.manualUpdate
      };
    case SET_PAGE_NOT_LAST:
      return {
        ...state,
        pageNotLast: action.pageNotLast
      };
    default:
      return state;
  }
}

const initialState = {
  anchor: '',
  dominio: '',
  config: initialConfigState,
  lastPage: null,
  page: '',
  pageSection: '',
  sectionParams: [],
  search: {},
  subdominio: ''
}

export const crcaUrl = (state = initialState, action) => {
  switch(action.type) {
    case SET_DEV_SUBDOMINIO:
    case SET_DOMINIOS_PROD:
    case SET_HOMEPAGE:
    case SET_MANUAL_UPDATE:
    case SET_PAGE_NOT_LAST:
      return {
        ...state,
        config: { ...crcaUrlConfig(state.config, action) }
      }
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
        search: action.search
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
