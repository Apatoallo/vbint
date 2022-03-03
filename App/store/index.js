import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as rootReducer from '../reducers/index';
const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState) => {
  const store = createStore(
    combineReducers(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index');
      compose(store.replaceReducer, combineReducers)(nextRootReducer);
    });
  }
  return store;
};

export default configureStore();
