'use strict';

import { DeleteAllQuestions, GetNextUnansweredQuestion } from '../survalytics/localdb';
import { Download, Upload } from '../survalytics/aws';

import { deletingAllQuestions, downloadingSurvey, hasNewQuestions, hasServerError, loadingQuestion, displaySurveyQuestion } from './status';
import { setCurrentQuestion } from './questions';


export function deleteAllQuestions() {
    return (dispatch) => {
        dispatch(deletingAllQuestions(true));

        DeleteAllQuestions();

        dispatch(deletingAllQuestions(false));
    };
};


export function downloadSurvey(immediate = false) {
    return (dispatch) => {
        dispatch(downloadingSurvey(true));

        Download(immediate)
            .then( (new_questions) => {
                dispatch(downloadingSurvey(false));
                if (new_questions) {
                    dispatch(hasNewQuestions(true));
                } else {
                    dispatch(hasNewQuestions(false));
                }
            })
            .catch( (error) => {
                console.log("downloadSurvey Error: " + error);
                dispatch(downloadingSurvey(false));
                dispatch(hasServerError(true));
            });
    };
};


export function viewQuestions() {
    return (dispatch) => {
        dispatch(loadingQuestion(true));
        
        GetNextUnansweredQuestion()
            .then( (q) => {
                dispatch(loadingQuestion(false));
                if (!q) {
                    dispatch(displayNoSurveyQuestions());
                }

                dispatch(setCurrentQuestion(q));

                dispatch(displaySurveyQuestion());
            })
            .catch( (err) => {
                console.log(err);
            });
    };
};


export function uploadResponses() {
    return (dispatch) => {
        dispatch(uploadingResponses(true));

        Upload()
            .then( (done) => {
                dispatch(uploadingResponses(false));
            })
            .catch( (error) => {
                dispatch(uploadingResponses(false));
                dispatch(hasServerError(true));
            });
    };
};
