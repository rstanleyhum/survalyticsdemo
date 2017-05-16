'use strict';

export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';


export function setCurrentQuestion(q) {
    console.log(q);
    return {
        type: SET_CURRENT_QUESTION,
        value: q
    }
}