'use strict';

import { DELETE_ALL, VIEW_QUESTIONS, UPLOAD, DOWNLOAD } from '../actions/main';

const initialState = {
    question: null
}

function AppReducer(state = initialState, action) {
    switch(action.type) {
        case DELETE_ALL:
            return state;
        case VIEW_QUESTIONS:
            return state;
        case UPLOAD:
            return state;
        case DOWNLOAD:
            return state;
        default:
            return state;
    }
}

export default AppReducer