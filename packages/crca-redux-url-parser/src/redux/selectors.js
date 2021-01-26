import { createSelector } from "reselect";
import { PAGE_HOME } from "../page.js";
import { ENV_DEV, ENV_PROD } from "../consts.js";

const crcaUrlStateSelector = state => state && state.crcaUrl || {};

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

export const crcaUrlAnchorSelector = createSelector (
  crcaUrlStateSelector,
  url => url.anchor || ''
);

export const crcaUrlConfigSelector = createSelector (
  crcaUrlStateSelector,
  url => url.config || {}
);

export const crcaUrlDevSubdominioSelector = createSelector (
  crcaUrlConfigSelector,
  config => config.devSubdominio || ''
);

export const crcaUrlDominioSelector = createSelector (
  crcaUrlStateSelector,
  url => url.dominio || ''
);

export const crcaUrlDominiosProdSelector = createSelector (
  crcaUrlConfigSelector,
  config => config.dominiosProd || []
);

export const crcaUrlHomepageSelector = createSelector (
  crcaUrlConfigSelector,
  config => config.homepage || PAGE_HOME
);

export const crcaUrlIsDominioProdSelector = createSelector (
  crcaUrlDominioSelector,
  crcaUrlDominiosProdSelector,
  (dominio, dominiosProd) => isDomainProd(dominio, dominiosProd)
);

export const crcaUrlEnvSelector = createSelector (
  crcaUrlIsDominioProdSelector,
  isProd => isProd ? ENV_PROD : ENV_DEV
)

export const crcaUrlLastPageSelector = createSelector (
  crcaUrlStateSelector,
  url => url.lastPage || null
);

export const crcaUrlManualUpdateSelector = createSelector (
  crcaUrlConfigSelector,
  config => config.manualUpdate || {}
);

export const crcaUrlPageSelector = createSelector (
  crcaUrlStateSelector,
  url => url.page || ''
);

export const crcaUrlPageNotLastSelector = createSelector (
  crcaUrlConfigSelector,
  config => config.pageNotLast || []
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