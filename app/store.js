/**
 * Create the store with asynchronously loaded reducers
 */
import { createStore, applyMiddleware, compose } from "redux";
import { fromJS } from "immutable";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";
import createReducer from "./reducers";

const reducerReq = require.context("./containers", true, /reducer\.js$/);

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
  /* eslint-enable */
  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );
  // Extensions
  store.asyncReducers = {}; // Async reducer registry

  reducerReq.keys().forEach(key => {
    const reducer = reducerReq(key).default;
    const matches = key.match(/\.\/(.*)+\//);
    if (matches) {
      store.asyncReducers[reducer.NAME || matches[1]] = reducer;
    } else {
      store.asyncReducers[reducer.NAME] = reducer;
    }
  });
  const nextReducers = createReducer(store.asyncReducers);
  store.replaceReducer(nextReducers);

  return store;
}
