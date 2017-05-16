'use strict';

import { uploadResponses } from '../actions/upload';
import { InsertResponses } from '../survalytics/localdb';


export const CHANGE_TEXT_ANSWER = 'CHANGE_TEXT_ANSWER';


export const submitAnswer = (dispatch, getState) => {
    dispatch(submittingResponse(true));

    dispatch(updateQuestion());
    
    dispatch(createResponse());

    dispatch(insertResponse());

    dispatch(uploadResponses());

    dispatch(submittingResponse(false));
}


export function submitTextAnswer() {
    return submtAnswer;
}


export function changeTextAnswer(text) {
    return { 
        type: CHANGE_TEXT_ANSWER,
        value: text
    }
}


export const UPDATE_SLIDER_VALUE = 'UPDATE_SLIDER_VALUE';


export function submitSliderAnswer() {
    return submitAnswer;
}


export function updateSliderValue(value) {
    return {
        type: UPDATE_SLIDER_VALUE,
        value: value
    }
}


export function submitButtonsAnswer(item) {
    return { 
        type: SUBMIT_BUTTONS_ANSWER,
        value: item
    }
}


export const CHANGE_CHECKBOX_VALUE = 'CHANGE_CHECKBOX_VALUE';

export function submitCheckBoxesAnswer() {
    return submitAnswer;
}


export function changeCheckBoxValue(item, value) {
    return {
        type: CHANGE_CHECKBOX_VALUE,
        item: item,
        value: value 
    }
}


export function skipQuestion() {
    return (dispatch, getState) => {
        // skip Question
    }
}