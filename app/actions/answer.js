'use strict';

export const SUBMIT_TEXT_ANSWER = 'SUBMIT_TEXT_ANSWER';
export const CHANGE_TEXT_ANSWER = 'CHANGE_TEXT_ANSWER';

export function submitTextAnswer() {
    return { type: SUBMIT_TEXT_ANSWER }
}

export function changeTextAnswer(text) {
    return { 
        type: CHANGE_TEXT_ANSWER,
        value: text
    }
}


export const SUBMIT_SLIDER_ANSWER = 'SUBMIT_SLIDER_ANSWER';
export const UPDATE_SLIDER_VALUE = 'UPDATE_SLIDER_VALUE';

export function submitSliderAnswer() {
    return { type: SUBMIT_SLIDER_ANSWER }
}

export function updateSliderValue(value) {
    return {
        type: UPDATE_SLIDER_VALUE,
        value: value
    }
}

export const SUBMIT_BUTTONS_ANSWER = 'SUBMIT_BUTTONS_ANSWER';

export function submitButtonsAnswer(item) {
    return { 
        type: SUBMIT_BUTTONS_ANSWER,
        value: item
    }
}

export const SUBMIT_CHECKBOXES_ANSWER = 'SUBMIT_CHECKBOXES_ANSWER';
export const CHANGE_CHECKBOX_VALUE = 'CHANGE_CHECKBOX_VALUE';

export function submitCheckBoxesAnswer() {
    return {
        type: SUBMIT_CHECKBOXES_ANSWER
    }
}

export function changeCheckBoxValue(item, value) {
    return {
        type: CHANGE_CHECKBOX_VALUE,
        item: item,
        value: value 
    }
}


export const SKIP_QUESTION = 'SKIP_QUESTION';

export function skipQuestion() {
    return { type: SKIP_QUESTION }
}