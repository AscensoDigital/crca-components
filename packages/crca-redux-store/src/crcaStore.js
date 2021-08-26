import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';

import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

import thunk from 'redux-thunk';

const composeWithDevTools =  process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose

export const crcaStore = createStore(
  state => state,
  composeWithDevTools(
    applyMiddleware(thunk),
    lazyReducerEnhancer(combineReducers)
  )
);