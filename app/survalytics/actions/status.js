'use strict';

export const SET_DELETING_ALL = 'SET_DELETING_ALL';
export const SET_DOWNLOADING_SURVEY = 'SET_DOWNLOADING_SURVEY';
export const SET_HAS_NEW_QUESTIONS = 'SET_HAS_NEW_QUESTIONS';
export const SET_HAS_SERVER_ERROR = 'SET_HAS_SERVER_ERROR';
export const SET_LOADING_QUESTION = 'SET_LOADING_QUESTION';


export function deletingAllQuestions(value) {
    return (dispatch) => {
        console.log("deletingAllQuestions: " + value);
    };
};

export function downloadingSurvey(value) {
    return (dispatch) => {
        console.log("downloadingSurvey: " + value);
    };
};


export function hasNewQuestions(value) {
    return (dispatch) => {
        console.log("hasNewQuestions: " + value);
    };
};


export function hasServerError(value) {
    return (dispatch) => {
        console.log("hasServerError: " + value);
    };
};


export function loadingQuestion(value) {
    return (dispatch) => {
        console.log("loadingQuestion: " + value);
    };
};


export function uploadingResponses(value) {
    return (dispatch) => {
        console.log("uploadingResponses: " + value);
    };
};
