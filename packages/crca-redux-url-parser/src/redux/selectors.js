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

export const crcaUrlDominiosProdSelector = createSelector (
  crcaUrlStateSelector,
  url => url.dominiosProd || []
);

export const isDomainProd = (domain, dominiosProd) => {
  for (const dom of dominiosProd) {
    const pos = domain.indexOf(dom);
    const len = domain.length;
    // console.log(`dom: ${dom}, domain: ${domain}, pos: ${pos}, len: ${len}, Resta: ${len-dom.length}`);
    if (pos !== -1 && len - dom.length === pos) {
      return true;
    }
  }
  return false;
};

export const crcaUrlIsDominioProdSelector = createSelector (
  crcaUrlDominioSelector,
  crcaUrlDominiosProdSelector,
  (dominio, dominiosProd) => isDomainProd(dominio, dominiosProd)
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

export const crcaUrlSectionParamsSelector = createSelector (
  crcaUrlStateSelector,
  url => url.sectionParams || []
);

export const crcaUrlSubdominioSelector = createSelector (
  crcaUrlStateSelector,
  url => url.subdominio || ''
);