'use strict';

import { Download } from '../survalytics/aws';
import { downloadingSurvey, hasNewQuestions, hasServerError } from './status';

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

