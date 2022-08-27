import { createSelector } from "reselect";

import { CRCA_URL_PAGE_HOME } from "../page.js";
import {
  CRCA_URL_ENV_DEV,
  CRCA_URL_ENV_PROD,
  CRCA_URL_STATUS_MAINTENANCE,
  CRCA_URL_STATUS_SUSPENDED
} from "../consts.js";

const crcaUrlStateSelector = state => state && state.crcaUrl || {};

export const crcaUrlIsDomainProd = (domain, dominiosProd) => {
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

export const crcaUrlIsSubdomainDev = (subdominio, subdominiosDev) => {
  for (const sub of subdominiosDev) {
    const pos = subdominio.indexOf(sub);
    const len = subdominio.length;
    // existe en el subdominio al comienzo o al final.
    // console.log(`sub: ${sub}, subdomain: ${subdominio}, pos: ${pos}, len: ${len}, Resta: ${len-sub.length}`);
    if (pos !== -1 && (pos=== 0 || len - sub.length === pos)) {
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
  config => config.homepage || CRCA_URL_PAGE_HOME
);

export const crcaUrlIsDominioProdSelector = createSelector (
  crcaUrlDominioSelector,
  crcaUrlDominiosProdSelector,
  (dominio, dominiosProd) => crcaUrlIsDomainProd(dominio, dominiosProd)
);

export const crcaUrlLastPageSelector = createSelector (
  crcaUrlStateSelector,
  url => url.lastPage || null
);

export const crcaUrlManualUpdateSelector = createSelector (
  crcaUrlConfigSelector,
  config => config.manualUpdate || {}
);

export const crcaUrlOfflineSelector = createSelector(
  crcaUrlStateSelector,
  url => url.offline || false
);

export const crcaUrlPageSelector = createSelector (
  crcaUrlStateSelector,
  url => url.page || ''
);

export const crcaUrlPagesNotLastSelector = createSelector (
  crcaUrlConfigSelector,
  config => config.pagesNotLast || []
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

export const crcaUrlStatusSelector = createSelector (
  crcaUrlStateSelector,
  url => url.status || ''
);

export const crcaUrlIsStatusMaintenanceSelector = createSelector (
  crcaUrlStatusSelector,
  status => status === CRCA_URL_STATUS_MAINTENANCE
);

export const crcaUrlIsStatusSuspendedSelector = createSelector (
  crcaUrlStatusSelector,
  status => status === CRCA_URL_STATUS_SUSPENDED
);

export const crcaUrlSubdominioSelector = createSelector (
  crcaUrlStateSelector,
  url => url.subdominio || ''
);

export const crcaUrlSubdominiosDevSelector = createSelector (
  crcaUrlConfigSelector,
  config => config.subdominiosDev || []
);

export const crcaUrlIsSubdominioDevSelector = createSelector (
  crcaUrlSubdominioSelector,
  crcaUrlSubdominiosDevSelector,
  (subdominio, subdominiosDev) => crcaUrlIsSubdomainDev(subdominio, subdominiosDev)
);

export const crcaUrlIsHostProdSelector = createSelector (
  crcaUrlIsDominioProdSelector,
  crcaUrlIsSubdominioDevSelector,
  (domainProd, subdomainDev) => (domainProd && !subdomainDev)
);

export const crcaUrlEnvSelector = createSelector (
  crcaUrlIsHostProdSelector,
  crcaUrlSubdominioSelector,
  (isProd, subdominio) => isProd ? CRCA_URL_ENV_PROD : (subdominio!=='' && subdominio || CRCA_URL_ENV_DEV)
);
