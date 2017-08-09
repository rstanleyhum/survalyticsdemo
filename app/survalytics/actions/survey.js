'use strict';

import { DeleteAllQuestions, GetNextUnansweredQuestion, DeleteAllResponses } from '../services/localdb';
import { Download, Upload } from '../services/aws';

import { uploadingResponses, deletingAllQuestions, downloadingSurvey, hasNewQuestions, hasServerError, loadingQuestion } from './status';
import { setNewQuestion, setCurrentQuestion } from './questions';
import { setSkippedSurvey } from './questions';



export function resetSkipSurvey() {
    return (dispatch) => {
        dispatch(setSkippedSurvey(false));
    };
};


export function deleteAllQuestions() {
    return (dispatch, getState) => {
        if (getState().survalytic.status.deleteAllQuestions) {
            return
        }

        dispatch(deletingAllQuestions(true));

        Promise.all([DeleteAllQuestions(), DeleteAllResponses()])
            .then( () => {
                dispatch(deletingAllQuestions(false));
            })
            .catch( (err) => {
                dispatch(deletingAllQuestions(false));
                console.log("ERROR (deleteAllQuestions): ", err);
            });
    };
};


export function downloadSurvey(immediate = false) {
    return (dispatch, getState) => {
        if (getState().survalytic.status.downloadingSurvey) {
            return
        }

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
            .catch( (err) => {
                console.log("ERROR: (downloadSurvey): ", err);
                dispatch(downloadingSurvey(false));
                dispatch(hasServerError(true));
            });
    };
};



export function viewQuestions() {
    return (dispatch) => {
        dispatch(setNewQuestion());
    };
};


export function uploadResponses() {
    return (dispatch, getState) => {
        if(getState().survalytic.status.uploadingResponses) {
            return
        }
        
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
