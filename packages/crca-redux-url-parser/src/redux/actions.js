import { PAGE_HOME, PAGE_NOT_LAST } from "../page.js";
import { crcaUrlDominioSelector, crcaUrlPageSelector, crcaUrlSubdominioSelector } from "./selectors.js";

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
  if(segments.lenght>2) {
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

export const updateSearch = (searchs) => (
  {
    type: UPDATE_SEARCH,
    searchs
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

const crcaLoadSubdominio = (subdominio, loaderAction = null, manualUpdate = false) => dispatch => {
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(subdominio));
  }
  if(!manualUpdate) {
    dispatch(updateSubdominio(subdominio));
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

export const crcaLoadPage = (page, loaderAction = null, manualUpdate = false) => dispatch => {
  if (PAGE_NOT_LAST.indexOf(page) === -1) {
    dispatch(updateLastPage(page));
  }

  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(page));
  }
  if(!manualUpdate) {
    dispatch(updatePage(page));
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

const crcaLoadSearch = (searchs, loaderAction = null, manualUpdate = false) => (dispatch) => {
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(searchs));
  }
  if(!manualUpdate) {
    dispatch(updateSearch(searchs));
  }
};

const crcaLoadAnchor = (anchor, loaderAction = null, manualUpdate = false) => (dispatch) => {
  if(typeof loaderAction === 'function') {
    dispatch(loaderAction(anchor));
  }
  if(!manualUpdate) {
    dispatch(updateAnchor(anchor));
  }
};

const defaultLoaders = {
  subdominio: null,
  dominio: null,
  page : null,
  section : null,
  searchs: null,
  anchor: null
}

const defaultConfig = {
  homepage: PAGE_HOME,
  loaders: defaultLoaders,
  localhosts: ['localhost', '127.0.1.1', '127.0.0.1'],
  localSubdominio: 'test',
  manualUpdate: {}
};

export const crcaUrlHandleNavigation = (location, config = {}) => (dispatch, getState) => {
  const conf = {...defaultConfig, ...config};

  const state = getState();
  const decodedHostname = decodeHostname(location.hostname);

  if ( decodedHostname.dominio !== crcaUrlDominioSelector(state) ) {
    dispatch(crcaLoadDominio(decodedHostname.dominio, conf.loaders.dominio, conf.manualUpdate.dominio));
  }

  const subdominio = conf.localhosts.includes(decodedHostname.dominio) ? conf.localSubdominio : decodedHostname.subdominio;
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

export const crcaUrlNavigate = url => dispatch => {
  window.history.pushState({}, '', url);
  dispatch(crcaUrlHandleNavigation(window.location));
};
