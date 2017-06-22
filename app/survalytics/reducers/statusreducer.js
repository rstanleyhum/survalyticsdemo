'use strict';

import { SET_SKIPPED_SURVEY } from '../actions/questions';


const initialState = {
    skippedSurvey: false,
}

function StatusReducer(state = initialState, action) {
    
    switch(action.type) {

        case SET_SKIPPED_SURVEY:
            return Object.assign({}, state, {
                skippedSurvey: action.value
            });
        
        default:
            return state;
    }
}

export default StatusReducer