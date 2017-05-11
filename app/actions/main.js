'use strict';

export const DELETE_ALL = 'DELETE_ALL';
export const VIEW_QUESTIONS = 'VIEW_QUESTIONS';
export const UPLOAD = "UPLOAD";
export const DOWNLOAD = "DOWNLOAD";

export function deleteAll() {
    return { type: DELETE_ALL }
}

export function viewQuestions() {
    return { type: VIEW_QUESTIONS }
}

export function upload() {
    return { type: UPLOAD }
}

export function download() {
    return { type: DOWNLOAD }
}

