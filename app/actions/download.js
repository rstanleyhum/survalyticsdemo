'use strict';

import { Download } from '../survalytics/aws';

export function downloadSurvey(immediate) {
    return (dispatch) => {
        dispatch(downloadingSurvey(true));

        Download(immediate)
            .then( (hasNewQuestions) => {
                dispatch(downloadingSurvey(false));
                if (hasNewQuestions) {
                    dispatch(hasNewQuestions(true));
                } else {
                    dispatch(hasNewQuestions(false));
                }
            })
            .catch( (error) => {
                dispatch(downloadingSurvey(false));
                dispatch(hasServerError(true));
            });
    };
};

