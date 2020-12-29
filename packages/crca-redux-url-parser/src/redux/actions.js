import {
  crcaUrlConfigSelector,
  crcaUrlDominioSelector,
  crcaUrlPageNotLastSelector,
  crcaUrlPageSelector,
  crcaUrlSubdominioSelector,
  isDomainProd
} from "./selectors.js";

export const SET_DEV_SUBDOMINIO = "SET_DEV_SUBDOMINIO";
export const SET_DOMINIOS_PROD = "SET_DOMINIOS_PROD";
export const SET_HOMEPAGE = "SET_HOMEPAGE";
export const SET_MANUAL_UPDATE = "SET_MANUAL_UPDATE";
export const SET_PAGE_NOT_LAST = "SET_PAGE_NOT_LAST";

export const UPDATE_ANCHOR = "UPDATE_ANCHOR";
export const UPDATE_DOMINIO = "UPDATE_DOMINIO";
export const UPDATE_LAST_PAGE = 'UPDATE_LAST_PAGE';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const UPDATE_SECTION = 'UPDATE_SECTION';
export const UPDATE_SUBDOMINIO = "UPDATE_SUBDOMINIO";


export const decodeAnchor = hash => {
  // anchor is extracted from the hash string: /santiago?q={query} /santiago#{acnhor}
  const match = RegExp('[#&]([^&]*)').exec(hash);
  return match && match[1] && decodeURIComponent(match[1]) || '';
}

export const decodeHostname = hostname => {
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

export const decodeSearch = search => {
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

export const decodeUrl = url => {
  const segments = url.split('/');
  const page = segments.shift();
  return {
    page,
    segments,
  };
};

export const setDevSubdominio = devSubdominio => (
  {
    type: SET_DEV_SUBDOMINIO,
    devSubdominio
  }
);

export const setDominiosProd = dominiosProd => (
  {
    type: SET_DOMINIOS_PROD,
    dominiosProd
  }
);

export const setHomepage = homepage => (
  {
    type: SET_HOMEPAGE,
    homepage
  }
);

export const setManualUpdate = manualUpdate => (
  {
    type: SET_MANUAL_UPDATE,
    manualUpdate
  }
);

export const setPageNotLast = pageNotLast => (
  {
    type: SET_PAGE_NOT_LAST,
    pageNotLast
  }
);

export const updateAnchor = anchor => (
  {
    type: UPDATE_ANCHOR,
    anchor,
  }
);

export const updateDominio = dominio => (
  {
    type: UPDATE_DOMINIO,
    dominio,
  }
);

export const updateLastPage = lastPage => (
  {
    type: UPDATE_LAST_PAGE,
    lastPage,
  }
);

export const updatePage = page => (
  {
    type: UPDATE_PAGE,
    page,
  }
);

export const updateSearch = (search) => (
  {
    type: UPDATE_SEARCH,
    search
  }
);

export const updateSection = (pageSection, sectionParams) => (
  {
    type: UPDATE_SECTION,
    pageSection,
    sectionParams,
  }
);

export const updateSubdominio = subdominio => (
  {
    type: UPDATE_SUBDOMINIO,
    subdominio,
  }
);

const crcaLoadAnchor = (anchor, loaderAction = null, manualUpdate = false) => (dispatch) => {
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(anchor));
  }
  if(!manualUpdate) {
    dispatch(updateAnchor(anchor));
  }
};

const crcaLoadDominio = (dominio, loaderAction = null, manualUpdate = false) => dispatch => {
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(dominio));
  }
  if(!manualUpdate) {
    dispatch(updateDominio(dominio));
  }
};

const crcaLoadSearch = (search, loaderAction = null, manualUpdate = false) => (dispatch) => {
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(search));
  }
  if(!manualUpdate) {
    dispatch(updateSearch(search));
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
    dispatch(updateSection(pageSection, sectionParams));
  }
};


const crcaLoadSubdominio = (subdominio, loaderAction = null, manualUpdate = false) => dispatch => {
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(subdominio));
  }
  if(!manualUpdate) {
    dispatch(updateSubdominio(subdominio));
  }
};

export const crcaLoadPage = (page, loaderAction = null, manualUpdate = false) => (dispatch, getState) => {
  const pageNotLast = crcaUrlPageNotLastSelector(getState());

  if (pageNotLast.indexOf(page) === -1) {
    dispatch(updateLastPage(page));
  }
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(page));
  }
  if(!manualUpdate) {
    dispatch(updatePage(page));
  }
};

const defaultLoaders = {
  subdominio: null,
  dominio: null,
  page : null,
  section : null,
  search: null,
  anchor: null
}

const defaultConfig = {
  loaders: defaultLoaders
};

export const crcaUrlHandleNavigation = (location, config = {}) => (dispatch, getState) => {
  const state = getState();

  const conf = {...defaultConfig, ...crcaUrlConfigSelector(state), ...config};

  const decodedHostname = decodeHostname(location.hostname);

  if ( decodedHostname.dominio !== crcaUrlDominioSelector(state) ) {
    dispatch(crcaLoadDominio(decodedHostname.dominio, conf.loaders.dominio, conf.manualUpdate.dominio));
  }

  const subdominio = isDomainProd(decodedHostname.dominio, conf.dominiosProd) ? decodedHostname.subdominio : conf.devSubdominio;
  if (subdominio !== crcaUrlSubdominioSelector(state)) {
    dispatch(crcaLoadSubdominio(subdominio, conf.loaders.subdominio, conf.manualUpdate.subdominio));
  }

  const path = decodeURIComponent(location.pathname);
  const url = path === '/' ? conf.homepage : path.slice(1);

  const decodedUrl = decodeUrl(url);
  if(decodedUrl.page !== crcaUrlPageSelector(state)){
    dispatch(crcaLoadPage(decodedUrl.page, conf.loaders.page, conf.manualUpdate.page));
  }

  dispatch(crcaLoadSection(decodedUrl.page, decodedUrl.segments, conf.loaders.section, conf.manualUpdate.section));

  const decodedAnchor = decodeAnchor(location.hash);
  dispatch(crcaLoadAnchor(decodedAnchor, conf.loaders.anchor, conf.manualUpdate.anchor));

  const decodedSearch = decodeSearch(location.search);
  dispatch(crcaLoadSearch(decodedSearch, conf.loaders.search, conf.manualUpdate.search));
};

export const crcaUrlNavigate = (url, config = {}) => dispatch => {
  window.history.pushState({}, '', url);
  dispatch(crcaUrlHandleNavigation(window.location, config));
};
