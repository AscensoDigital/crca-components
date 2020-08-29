import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';

import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

import thunk from 'redux-thunk';


// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// const combinedReducers = combineReducers({
//   app: app,
//   counter: counter,
// });

export const crcaStore = createStore(
  state => state,
  devCompose(
    applyMiddleware(thunk),
    lazyReducerEnhancer(combineReducers)
  )
);