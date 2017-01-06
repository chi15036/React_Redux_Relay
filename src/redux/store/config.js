import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import combineReducer from '../reducers/index.js'
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../actions/entityDetection.js';

const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(combineReducer, {}, composeEnhancers(applyMiddleware(epicMiddleware, thunk)))

export default store
