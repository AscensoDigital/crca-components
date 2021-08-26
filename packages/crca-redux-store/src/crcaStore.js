import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

import thunk from 'redux-thunk';

export const crcaStore = createStore(
  state => state,
  composeWithDevTools(
    applyMiddleware(thunk),
    lazyReducerEnhancer(combineReducers)
  )
);