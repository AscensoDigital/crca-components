import { createSelector } from "reselect";
import { SCOPE_PAGE, SCOPE_ELEMENT, SCOPE_INTERNAL } from "./actions";

const crcaLoadingStateSelector = state => state && state.crcaLoading || {};

const _crcaLoadingPageSelector = createSelector (
  crcaLoadingStateSelector,
  loading => loading.page || []
)

const _crcaLoadingElementSelector = createSelector (
  crcaLoadingStateSelector,
  loading => loading.element || []
)

const _crcaLoadingInternalSelector = createSelector (
  crcaLoadingStateSelector,
  loading => loading.internal || []
)

export const crcaLoadingPageSelector = createSelector (
  _crcaLoadingPageSelector,
  page => page.length>0
)

export const crcaLoadingElementSelector = createSelector (
  _crcaLoadingElementSelector,
  element => element.length>0
)

export const crcaLoadingInternalSelector = createSelector (
  _crcaLoadingInternalSelector,
  internal => internal.length>0
)


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

export const crcaLoadingPageExistProccessSelector = (state, process) => {
  const prcs = _crcaLoadingPageSelector(state);
  return prcs.filter(p => p===process).length>0
}

export const crcaLoadingElementExistProccessSelector = (state, process) => {
  const prcs = _crcaLoadingElementSelector(state);
  return prcs.filter(p => p===process).length>0
}

export const crcaLoadingInternalExistProccessSelector = (state, process) => {
  const prcs = _crcaLoadingInternalSelector(state);
  return prcs.filter(p => p===process).length>0
}

export const crcaLoadingExistProccessSelector = (state, process) => {
  if(crcaLoadingPageExistProccessSelector(state,process)) {
    return SCOPE_PAGE;
  }
  if(crcaLoadingElementExistProccessSelector(state,process)) {
    return SCOPE_ELEMENT;
  }
  if(crcaLoadingInternalExistProccessSelector(state,process)) {
    return SCOPE_INTERNAL;
  }
  return false;
}