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


export function displaySurveyQuestion() {
    return (dispatch) => {
        console.log("displaySurveyQuestion");
    };
};