'use strict';

import { Download } from '../survalytics/aws';
import { GetNextUnansweredQuestion } from '../survalytics/localdb';
import { setCurrentQuestion } from './questions';
import { loadingQuestion, displaySurveyQuestion } from './status';

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

