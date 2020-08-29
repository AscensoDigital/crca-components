import { createSelector } from "reselect";

export const crcaLoadingPageSelector = state => state.crcaLoading && state.crcaLoading.page && state.crcaLoading.page.length>0 || false;
export const crcaLoadingElementSelector = state => state.crcaLoading && state.crcaLoading.element && state.crcaLoading.element.length>0 || false;
export const crcaLoadingInternalSelector = state => state.crcaLoading && state.crcaLoading.internal && state.crcaLoading.internal.length>0 || false;

export const crcaLoadingUntilElementSelector = createSelector(
  crcaLoadingPageSelector,
  crcaLoadingElementSelector,
  (page, element) => page || element
)

export const crcaLoadingSelector = createSelector(
  crcaLoadingPageSelector,
  crcaLoadingElementSelector,
  crcaLoadingInternalSelector,
  (page, element, internal) => page || element || internal
)

