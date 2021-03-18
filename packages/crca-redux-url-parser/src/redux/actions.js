import { CrcaUrlLoader } from "../CrcaUrlLoader.js";
import { CRCA_URL_PAGE_MAINTENANCE, CRCA_URL_PAGE_SUSPENDED } from "../page.js";
import {
  crcaUrlConfigSelector,
  crcaUrlDominioSelector,
  crcaUrlPageNotLastSelector,
  crcaUrlPageSelector,
  crcaUrlSubdominioSelector,
  crcaUrlIsDomainProd,
  crcaUrlIsStatusSuspendedSelector,
  crcaUrlIsStatusMaintenanceSelector
} from "./selectors.js";

export const CRCA_URL_ADD_PAGE_NOT_LAST = "CRCA_URL_ADD_PAGE_NOT_LAST";
export const CRCA_URL_SET_DEV_SUBDOMINIO = "CRCA_URL_SET_DEV_SUBDOMINIO";
export const CRCA_URL_SET_DOMINIOS_PROD = "CRCA_URL_SET_DOMINIOS_PROD";
export const CRCA_URL_SET_HOMEPAGE = "CRCA_URL_SET_HOMEPAGE";
export const CRCA_URL_SET_MANUAL_UPDATE = "CRCA_URL_SET_MANUAL_UPDATE";
export const CRCA_URL_SET_PAGE_NOT_LAST = "CRCA_URL_SET_PAGE_NOT_LAST";
export const CRCA_URL_SET_SUBDOMINIOS_DEV = "SET_SUBDOMINIOS_DEV";

export const CRCA_URL_UPDATE_ANCHOR = "CRCA_URL_UPDATE_ANCHOR";
export const CRCA_URL_UPDATE_DOMINIO = "CRCA_URL_UPDATE_DOMINIO";
export const CRCA_URL_UPDATE_LAST_PAGE = 'CRCA_URL_UPDATE_LAST_PAGE';
export const CRCA_URL_UPDATE_OFFLINE = 'CRCA_URL_UPDATE_OFFLINE';
export const CRCA_URL_UPDATE_PAGE = 'CRCA_URL_UPDATE_PAGE';
export const CRCA_URL_UPDATE_SEARCH = 'CRCA_URL_UPDATE_SEARCH';
export const CRCA_URL_UPDATE_SECTION = 'CRCA_URL_UPDATE_SECTION';
export const CRCA_URL_UPDATE_SUBDOMINIO = "CRCA_URL_UPDATE_SUBDOMINIO";
export const CRCA_URL_UPDATE_STATUS = "CRCA_URL_UPDATE_STATUS";

export const crcaUrlDecodeAnchor = hash => {
  // anchor is extracted from the hash string: /santiago?q={query} /santiago#{acnhor}
  const match = RegExp('[#&]([^&]*)').exec(hash);
  return match && match[1] && decodeURIComponent(match[1]) || '';
}

export const crcaUrlDecodeHostname = hostname => {
  const segments = hostname.split('.');

  let subdominio = '';
  if(segments.length>2) {
    subdominio = segments.shift();
  }

  return {
    subdominio,
    dominio: segments.join('.'),
  };
};

export const crcaUrlDecodeSearch = search => {
  if (search === '') {
    return {};
  }
  const segments = search.substring(1).split('&');
  const ret = {};
  segments.forEach(v => {
    const parts = v.split('=');
    // eslint-disable-next-line prefer-destructuring
    ret[parts[0]] = parts[1];
  });
  return ret;
};

export const crcaUrlDecodeUrl = url => {
  const segments = url.split('/');
  const page = segments.shift();
  return {
    page,
    segments,
  };
};

// ACTIONS FUNCTIONS
export const crcaUrlAddPageNotLast = pageNotLast => (
  {
    type: CRCA_URL_ADD_PAGE_NOT_LAST,
    pageNotLast: typeof pageNotLast === "string" ? [pageNotLast] : pageNotLast
  }
);

export const crcaUrlSetDevSubdominio = devSubdominio => (
  {
    type: CRCA_URL_SET_DEV_SUBDOMINIO,
    devSubdominio
  }
);

export const crcaUrlSetDominiosProd = dominiosProd => (
  {
    type: CRCA_URL_SET_DOMINIOS_PROD,
    dominiosProd
  }
);

export const crcaUrlSetHomepage = homepage => (
  {
    type: CRCA_URL_SET_HOMEPAGE,
    homepage
  }
);

export const crcaUrlSetManualUpdate = manualUpdate => (
  {
    type: CRCA_URL_SET_MANUAL_UPDATE,
    manualUpdate
  }
);

export const crcaUrlSetPageNotLast = pageNotLast => (
  {
    type: CRCA_URL_SET_PAGE_NOT_LAST,
    pageNotLast
  }
);

export const crcaUrlSetSubdominiosDev = subdominiosDev => (
  {
    type: CRCA_URL_SET_SUBDOMINIOS_DEV,
    subdominiosDev
  }
);

export const crcaUrlUpdateAnchor = anchor => (
  {
    type: CRCA_URL_UPDATE_ANCHOR,
    anchor,
  }
);

export const crcaUrlUpdateDominio = dominio => (
  {
    type: CRCA_URL_UPDATE_DOMINIO,
    dominio,
  }
);

export const crcaUrlUpdateLastPage = lastPage => (
  {
    type: CRCA_URL_UPDATE_LAST_PAGE,
    lastPage,
  }
);

export const crcaUrlUpdateOffline = offline => ({
  type: CRCA_URL_UPDATE_OFFLINE,
  offline,
});

export const crcaUrlUpdatePage = page => (
  {
    type: CRCA_URL_UPDATE_PAGE,
    page,
  }
);

export const crcaUrlUpdateSearch = (search) => (
  {
    type: CRCA_URL_UPDATE_SEARCH,
    search
  }
);

export const crcaUrlUpdateSection = (pageSection, sectionParams) => (
  {
    type: CRCA_URL_UPDATE_SECTION,
    pageSection,
    sectionParams,
  }
);

export const crcaUrlUpdateSubdominio = subdominio => (
  {
    type: CRCA_URL_UPDATE_SUBDOMINIO,
    subdominio,
  }
);

export const crcaUrlUpdateStatus = status => (
  {
    type: CRCA_URL_UPDATE_STATUS,
    status
  }
);

const crcaLoadAnchor = (anchor, loaderAction = null, manualUpdate = false) => (dispatch) => {
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(anchor));
  }
  if(!manualUpdate) {
    dispatch(crcaUrlUpdateAnchor(anchor));
  }
};

const crcaLoadDominio = (dominio, loaderAction = null, manualUpdate = false) => dispatch => {
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(dominio));
  }
  if(!manualUpdate) {
    dispatch(crcaUrlUpdateDominio(dominio));
  }
};

const crcaLoadSearch = (search, loaderAction = null, manualUpdate = false) => (dispatch) => {
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(search));
  }
  if(!manualUpdate) {
    dispatch(crcaUrlUpdateSearch(search));
  }
};

const crcaLoadSection = (page, segments, loaderAction = null, manualUpdate = false) => (dispatch) => {
  let pageSection = '';
  let sectionParams = [];

  if (segments.length > 0) {
    pageSection = segments.shift();
    sectionParams = segments;
  }
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(page, pageSection, sectionParams));
  }
  if(!manualUpdate) {
    dispatch(crcaUrlUpdateSection(pageSection, sectionParams));
  }
};


const crcaLoadSubdominio = (subdominio, loaderAction = null, manualUpdate = false) => dispatch => {
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(subdominio));
  }
  if(!manualUpdate) {
    dispatch(crcaUrlUpdateSubdominio(subdominio));
  }
};

export const crcaUrlLoadPage = (page, loaderAction = null, manualUpdate = false) => (dispatch, getState) => {
  const pageNotLast = crcaUrlPageNotLastSelector(getState());
  const actualPage = crcaUrlPageSelector(state);
  const isSuspended = crcaUrlIsStatusSuspendedSelector(state);
  const isMaintenance = crcaUrlIsStatusMaintenanceSelector(state);

  if (pageNotLast.indexOf(page) === -1) {
    dispatch(crcaUrlUpdateLastPage(page));
  }

  if(actualPage===CRCA_URL_PAGE_MAINTENANCE && isMaintenance) {
    return;
  }

  if(actualPage===CRCA_URL_PAGE_SUSPENDED && isSuspended) {
    return;
  }

  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(page));
  }
  if(!manualUpdate) {
    dispatch(crcaUrlUpdatePage(page));
  }
};

export const crcaUrlHandleNavigation = location => (dispatch, getState) => {
  const state = getState();

  const conf = crcaUrlConfigSelector(state);

  const decodedHostname = crcaUrlDecodeHostname(location.hostname);

  if ( decodedHostname.dominio !== crcaUrlDominioSelector(state) ) {
    dispatch(crcaLoadDominio(decodedHostname.dominio, CrcaUrlLoader.dominio, conf.manualUpdate.dominio));
  }

  const subdominio = crcaUrlIsDomainProd(decodedHostname.dominio, conf.dominiosProd) ? decodedHostname.subdominio : conf.devSubdominio;
  if (subdominio !== crcaUrlSubdominioSelector(state)) {
    dispatch(crcaLoadSubdominio(subdominio, CrcaUrlLoader.subdominio, conf.manualUpdate.subdominio));
  }

  const path = decodeURIComponent(location.pathname);
  const url = path === '/' ? conf.homepage : path.slice(1);

  const decodedUrl = crcaUrlDecodeUrl(url);
  if(decodedUrl.page !== crcaUrlPageSelector(state)){
    dispatch(crcaLoadPage(decodedUrl.page, CrcaUrlLoader.page, conf.manualUpdate.page));
  }

  dispatch(crcaLoadSection(decodedUrl.page, decodedUrl.segments, CrcaUrlLoader.section, conf.manualUpdate.section));

  const decodedAnchor = crcaUrlDecodeAnchor(location.hash);
  dispatch(crcaLoadAnchor(decodedAnchor, CrcaUrlLoader.anchor, conf.manualUpdate.anchor));

  const decodedSearch = crcaUrlDecodeSearch(location.search);
  dispatch(crcaLoadSearch(decodedSearch, CrcaUrlLoader.search, conf.manualUpdate.search));
};

export const crcaUrlNavigate = url => dispatch => {
  window.history.pushState({}, '', url);
  dispatch(crcaUrlHandleNavigation(window.location));
};
