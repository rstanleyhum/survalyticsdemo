'use strict';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import AppReducer from './reducers/appreducer';
import { navReducer } from './appnav';

const middleware = () => {
    return applyMiddleware(thunk)
}

export default createStore(
    combineReducers({
        applogic: AppReducer,
        nav: navReducer,
    }),
    middleware(),
)

