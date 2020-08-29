export const SCOPE_PAGE = 'page';
export const SCOPE_ELEMENT = 'element';
export const SCOPE_INTERNAL = 'internal';

export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

const startLoading = (scope, process) => {
  return {
    type: START_LOADING,
    payload: {
      scope,
      process
    }
  }
}

export const startPageLoading = process => startLoading(SCOPE_PAGE, process);
export const startElementLoading = process => startLoading(SCOPE_ELEMENT, process);
export const startInternalLoading = process => startLoading(SCOPE_INTERNAL, process);

const stopLoading = (scope, process) => {
  return {
    type: STOP_LOADING,
    payload: {
      scope,
      process
    }
  }
}

export const stopPageLoading = process => stopLoading(SCOPE_PAGE, process);
export const stopElementLoading = process => stopLoading(SCOPE_ELEMENT, process);
export const stopInternalLoading = process => stopLoading(SCOPE_INTERNAL, process);

