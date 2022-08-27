import { CRCA_URL_PAGE_HOME, CRCA_URL_PAGES_NOT_LAST } from '../page.js';

import {
  CRCA_URL_ADD_PAGES_NOT_LAST,
  CRCA_URL_SET_DEV_SUBDOMINIO,
  CRCA_URL_SET_DOMINIOS_PROD,
  CRCA_URL_SET_HOMEPAGE,
  CRCA_URL_SET_MANUAL_UPDATE,
  CRCA_URL_SET_PAGES_NOT_LAST,
  CRCA_URL_SET_SUBDOMINIOS_DEV,
  CRCA_URL_UPDATE_ANCHOR,
  CRCA_URL_UPDATE_DOMINIO,
  CRCA_URL_UPDATE_LAST_PAGE,
  CRCA_URL_UPDATE_OFFLINE,
  CRCA_URL_UPDATE_PAGE,
  CRCA_URL_UPDATE_SEARCH,
  CRCA_URL_UPDATE_SECTION,
  CRCA_URL_UPDATE_SUBDOMINIO,
  CRCA_URL_UPDATE_STATUS
} from './actions.js';


const initialConfigState = {
  devSubdominio: '',
  dominiosProd: [],
  subdominiosDev: ['test', 'dev'],
  homepage: CRCA_URL_PAGE_HOME,
  manualUpdate: {
    anchor: false,
    dominio: false,
    page: false,
    section: false,
    search: false,
    subdominio: false,
  },
  pagesNotLast: CRCA_URL_PAGES_NOT_LAST,
};

const crcaUrlConfig = (state = initialConfigState, action) => {
  switch(action.type) {
    case CRCA_URL_ADD_PAGES_NOT_LAST:
      return {
        ...state,
        pagesNotLast: {
          ...state.pagesNotLast,
          ...action.pagesNotLast
        }
      }
    case CRCA_URL_SET_DEV_SUBDOMINIO:
      return {
        ...state,
        devSubdominio: action.devSubdominio
      };
    case CRCA_URL_SET_DOMINIOS_PROD:
      return {
        ...state,
        dominiosProd: action.dominiosProd
      };
    case CRCA_URL_SET_HOMEPAGE:
      return {
        ...state,
        homepage: action.homepage
      };
    case CRCA_URL_SET_MANUAL_UPDATE:
      return {
        ...state,
        manualUpdate: action.manualUpdate
      };
    case CRCA_URL_SET_PAGES_NOT_LAST:
      return {
        ...state,
        pagesNotLast: action.pagesNotLast
      };
    case CRCA_URL_SET_SUBDOMINIOS_DEV:
      return {
        ...state,
        subdominiosDev: action.subdominiosDev
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
  offline: false,
  page: '',
  pageSection: '',
  sectionParams: [],
  search: {},
  subdominio: '',
  status: '',
}

export const crcaUrl = (state = initialState, action) => {
  switch(action.type) {
    case CRCA_URL_ADD_PAGES_NOT_LAST:
    case CRCA_URL_SET_DEV_SUBDOMINIO:
    case CRCA_URL_SET_DOMINIOS_PROD:
    case CRCA_URL_SET_HOMEPAGE:
    case CRCA_URL_SET_MANUAL_UPDATE:
    case CRCA_URL_SET_PAGES_NOT_LAST:
    case CRCA_URL_SET_SUBDOMINIOS_DEV:
      return {
        ...state,
        config: { ...crcaUrlConfig(state.config, action) }
      };
    case CRCA_URL_UPDATE_ANCHOR:
      return {
        ...state,
        anchor: action.anchor
      };
    case CRCA_URL_UPDATE_DOMINIO:
      return {
        ...state,
        dominio: action.dominio
      };
    case CRCA_URL_UPDATE_SEARCH:
      return {
        ...state,
        search: action.search
      };
    case CRCA_URL_UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline,
      };
    case CRCA_URL_UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      };
    case CRCA_URL_UPDATE_LAST_PAGE:
      return {
        ...state,
        lastPage: action.lastPage
      };
    case CRCA_URL_UPDATE_SECTION:
      return {
        ...state,
        pageSection: action.pageSection,
        sectionParams: action.sectionParams
      };
    case CRCA_URL_UPDATE_SUBDOMINIO:
      return {
        ...state,
        subdominio: action.subdominio
      };
    case CRCA_URL_UPDATE_STATUS:
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
}
