'use strict';

import { Upload } from '../survalytics/aws';

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

