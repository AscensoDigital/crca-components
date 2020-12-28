import { createSelector } from "reselect";

const crcaUrlStateSelector = state => state && state.crcaUrl || {};

export const crcaUrlAnchorSelector = createSelector (
  crcaUrlStateSelector,
  url => url.anchor || ''
);

export const crcaUrlDominioSelector = createSelector (
  crcaUrlStateSelector,
  url => url.dominio || ''
);

export const crcaUrlLastPageSelector = createSelector (
  crcaUrlStateSelector,
  url => url.lastPage || null
);

export const crcaUrlPageSelector = createSelector (
  crcaUrlStateSelector,
  url => url.page || ''
);

export const crcaUrlPageSectionSelector = createSelector (
  crcaUrlStateSelector,
  url => url.pageSection || ''
);

export const crcaUrlSearchSelector = createSelector (
  crcaUrlStateSelector,
  url => url.search || {}
);

export const crcaUrlSubdominioSelector = createSelector (
  crcaUrlStateSelector,
  url => url.subdominio || ''
);