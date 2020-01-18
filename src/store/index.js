import { combineReducers, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from 'redux-thunk';

import reducer from './utilities/official'

const rootReducer = combineReducers(reducer);
const logger = createLogger({ collapsed: true });
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, logger));
const store = createStore(rootReducer, middleware);

export default store;
