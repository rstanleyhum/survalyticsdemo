'use strict';

import { deletingAllQuestions } from './status';
import { DeleteAllQuestions } from '../survalytics/localdb';

export function deleteAllQuestions() {
    return (dispatch) => {
        dispatch(deletingAllQuestions(true));

        DeleteAllQuestions();

        dispatch(deletingAllQuestions(false));
    };
};

