import { isNull } from './data-utils.js';

export const generateUrl = (urlParts, getVars = null) => `${urlParts.join('/')}${!isNull(getVars) && getVars.length ? `?${getVars.join('&')}` : ''}`;