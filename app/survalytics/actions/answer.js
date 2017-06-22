'use strict';

import { NavigationActions } from 'react-navigation';
import { UpdateQuestions, InsertResponse } from '../services/localdb';
import { NewResponseFromQuestion } from '../services/response';
import { setNewQuestion } from './questions';

export const CHANGE_TEXT_ANSWER = 'CHANGE_TEXT_ANSWER';
export const UPDATE_SLIDER_VALUE = 'UPDATE_SLIDER_VALUE';
export const SET_BUTTONS_ANSWER = 'SET_BUTTONS_ANSWER';
export const CHANGE_CHECKBOX_VALUE = 'CHANGE_CHECKBOX_VALUE';
export const UPDATE_QUESTION_WITH_RESPONSE = "UPDATE_QUESTION_WITH_RESPONSE";
export const CREATE_RESPONSE = 'CREATE_RESPONSE';


export function submitAnswer() {
    return (dispatch, getState) => {
        //dispatch(submittingResponse(true));
        dispatch(updateQuestionWithResponse());
    
        return UpdateQuestions([getState().survalytic.currentq.question])
                .then( () => {
                    return NewResponseFromQuestion(getState().survalytic.currentq.question);
                })
                .then( (r) => {
                    return InsertResponse(r);
                })
                .then( () => {
                    dispatch(setNewQuestion());
                })
                .catch( (err) => {
                    console.log(err);
                });
    };
};

export function createReponse() {
    return {
        type: CREATE_RESPONSE
    }
}

export function updateQuestionWithResponse() {
    return {
        type: UPDATE_QUESTION_WITH_RESPONSE
    }
}


export function submitTextAnswer() {
    return (dispatch) => {
        dispatch(submitAnswer())
    };
}


export function changeTextAnswer(text) {
    return { 
        type: CHANGE_TEXT_ANSWER,
        value: text
    }
}


export function submitSliderAnswer() {
    return (dispatch) => {
        dispatch(submitAnswer());
    }
}


export function updateSliderValue(value) {
    return {
        type: UPDATE_SLIDER_VALUE,
        value: value
    }
}


export function submitButtonsAnswer(item) {
    return (dispatch, getState) => {
            dispatch(setButtonsAnswer(item));
            return dispatch(submitAnswer());
    };
};


export function setButtonsAnswer(item) {
    return { 
        type: SET_BUTTONS_ANSWER,
        value: item
    }
}


export function submitCheckBoxesAnswer() {
    return (dispatch) => {
        dispatch(submitAnswer());
    };
}


export function changeCheckBoxValue(item, value) {
    return {
        type: CHANGE_CHECKBOX_VALUE,
        item: item,
        value: value 
    }
}
