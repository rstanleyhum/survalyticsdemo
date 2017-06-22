'use strict';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import SurvalyticReducer from './survalytics/reducers/survalyticreducer';
import { navReducer } from './appnav';

const middleware = () => {
    return applyMiddleware(thunk)
}

export default createStore(
    combineReducers({
        survalytic: SurvalyticReducer,
        nav: navReducer,
    }),
    middleware(),
)

