'use strict';

import Response from 'response';
import Question from 'question';


const CREATE_QUESTION_TABLE_SQL = `CREATE TABLE IF NOT EXISTS questionlist (
    ordinalposition_int INTEGER PRIMARY KEY, 
    questionguid_str TEXT,
    json_str TEXT,
    final_responseid_int, INTEGER,
    final_response_str TEXT,
    ongoingquestion_int INTEGER,
    answered_int INTEGER,
    uploaded_int INTEGER);
`;

const CREATE_RESPONSE_TABLE_SQL = `CREATE TABLE IF NOT EXISTS responsestoupload (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    json TEXT,
    uploaded INTEGER);
`;

const INSERT_RESPONSES_SQL = `INSERT INTO responsestoupload (json, uploaded ) VALUES (?, ?);`;

const SELECT_RESPONSES_TOUPLOAD_SQL = `SELECT * FROM responsestoupload WHERE uploaded = 0;`;

const DELETE_REPSONSE_BY_ID_SQL = `DELETE FROM responsestoupload WHERE _id = ?;`;

const SELECT_QUESTION_BY_GUID_SQL = `SELECT * FROM questionlist WHERE questionguid_str = ?;`;

const INSERT_QUESTION_SQL = `INSERT INTO questionlist 
    (ordinalposition_int, questionguid_str, json_str, final_responseid_int, final_response_str, ongoingquestion_int, answered_int, uploaded_int)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`;

const SELECT_NEXT_UNANSWERED_QUESTION_SQL = `SELECT * FROM questionlist WHERE answered_int = 0 ORDER BY ordinalposition_int;`;

const DELETE_QUESTION_BY_ORDINALPOSITION_SQL = `DELETE FROM questionlist WHERE ordinalposition_int = ?;`;

const DELETE_QUESTION_BY_QUESTIONGUID_SQL = `DELETE FROM questionlist WHERE questionguid = ?;`;

const DELETE_ALL_QUESTIONS_SQL = `DELETE FROM questionlist;`;


const db = SQLite.openDatabase({name: 'questions.db3'});


export const SetupLocalDB = () => {
    db.transaction(
        tx => {
            tx.executeSql(CREATE_QUESTION_TABLE_SQL, [], (_, _) => {console.log("tq created")}, (_, _) => {console.log("tq error creating")} );
            tx.executeSql(CREATE_RESPONSE_TABLE_SQL, [], (_, _) => {console.log("tr created")}, (_, _) => {console.log("tr error creating")} );
        },
        (err) => {console.log(err)},
        () => {console.log("create transaction success")}
    );
};


export const InsertQuestions = (questions) => {
    var num_questions = questions.length;
    for (var i = 0; i < num_questions; i++) {
        var item = questions[i];
        var args = [
            item.ordinalposition_int,
            item.questionguid,
            JSON.stringify(item.json_str),
            item.final_responseid_int,
            item.final_response_str,
            item.ongoingquestion_int,
            item.answered_bool,
            item.uploaded_int
        ];
        db.transaction(
            tx => {
                tx.executeSql(INSERT_QUESTION_SQL, args, (_, _) => {console.log("success insert question")}, (_, err) => {console.log("Error insert question", err)});
            },
            (err) => {console.log(err)},
            () => {console.log("inserted question")}
        );
    }; 
};


export const GetQuestion = (guid) => {
    var row_results = [];
    var args = [
        guid
    ];

    db.transaction(
        tx => {
            tx.executeSql(SELECT_QUESTION_BY_GUID_SQL, args, (_, { rows: { _array } }) => {
                    if (_array) {
                        row_results = Object.assign({}, _array);
                    };
                },
                (_, err) => {console.log("error getting question", err)}
            );
        },
        (err) => {console.log(err)},
        () => { console.log("success") }
    );

    if (row_results.length == 0) {
        return null;
    }
    var item = row_results[0];

    var q = new Question(
        item.questionguid_str,
        item.json_str,
        item.ordinalposition_int,
        item.final_responseid_int,
        item.final_response_str,
        item.answered_int
    );
    return q;
};


export const DeleteQuestions = (questions) => {
    var num_questions = questions.length;
    for (var i = 0; i < num_questions; i++) {
        var item = questions[i];
        var args = [
            item.ordinalposition_int,
        ];
        db.transaction(
            tx => {
                tx.executeSql(DELETE_QUESTION_BY_ORDINALPOSITION_SQL, args, (_, _) => {console.log("success delete question")}, (_, err) => {console.log("Error delete question", err)});
            },
            (err) => {console.log(err)},
            () => {console.log("deleted question")}
        );
    };
};


export const DeleteQuestionsByGuid = (questionguids) => {
    var num_questions = questionguids.length;
    for (var i = 0; i < num_questions; i++) {
        var item = questionguids[i];
        var args = [
            item,
        ];
        db.transaction(
            tx => {
                tx.executeSql(DELETE_QUESTION_BY_QUESTIONGUID_SQL, args, (_, _) => {console.log("success delete question")}, (_, err) => {console.log("Error delete question", err)});
            },
            (err) => {console.log(err)},
            () => {console.log("deleted question")}
        );
    };
};


export const DeleteAllQuestions = () => {
    db.transaction(
        tx => {
            tx.executeSql(DELETE_ALL_QUESTIONS_SQL, [], (_, _) => {console.log("all questions deleted")}, (_, err) => {console.log("all questions deleted error", err)} );
        },
        (err) => {console.log(err)},
        () => {console.log("all questions deleted success")}
    );
};


export const UpdateQuestions = (questions) => {
    var num_questions = questions.length;
    for (var i = 0; i < num_questions; i++) {
        var item = questions[i];
        DeleteQuestions([item]);
        InsertQuestions([item]);    
    };
};


export const GetNextUnansweredQuestion = () => {
    var row_results = [];
    db.transaction(
        tx => {
            tx.executeSql(SELECT_NEXT_UNANSWERED_QUESTION_SQL, [], (_, { rows: { _array } }) => {
                    if (_array) {
                        row_results = Object.assign({}, _array);
                    };
                },
                (_, err) => {console.log("error getting question", err)}
            );
        },
        (err) => {console.log(err)},
        () => { console.log("success") }
    );
    
    var num_results = row_results.length;
    
    for (var i = 0; i < num_results; i++) {
        var item = row_results[i];
        var q = new Question(
            item.questionguid_str,
            item.json_str,
            item.ordinalposition_int,
            item.final_responseid_int,
            item.final_response_str,
            item.answered_int
        );
 
        if (!q.isConditional()) {
            return q;
        }

        if (q.isRelevantConditionalQuestion()) {
            return q;
        }
    } 

    return null;
};


export const InsertResponses = (responses) => {
    var num_responses = responses.length;
    for (var i = 0; i < num_responses; i++) {
        var item = responses[i];
        var args = [
            JSON.stringify(item.json),
            item.uploaded
        ];
        db.transaction(
            tx => {
                tx.executeSql(INSERT_RESPONSES_SQL, args, (_, _) => {console.log("success insert response")}, (_, err) => {console.log("Error insert response", err)});
            },
            (err) => {console.log(err)},
            () => {console.log("inserted response")}
        );
    }; 
};


export const GetResponsesToUpload = () => {
    var row_results = [];
    db.transaction(
        tx => {
            tx.executeSql(SELECT_RESPONSES_TOUPLOAD_SQL, [], (_, { rows: { _array } }) => {
                    if (_array) {
                        row_results = Object.assign({}, _array);
                    };
                },
                (_, err) => {console.log("error getting responses", err)}
            );
        },
        (err) => {console.log(err)},
        () => { console.log("success") }
    );
    num_results = row_results.length;
    results = [];
    for (var i = 0; i < num_results; i++) {
        var { id, json_str, uploaded } = row_results[i];
        var item = new Response(id, JSON.parse(json_str), uploaded);
        results.push(item);
    }
    return results;
};


export const DeleteResponses = (responses) => {
    var num_responses = responses.length;
    for (var i = 0; i < num_responses; i++) {
        var item = responses[i];
        var args = [
            item.id
        ];
        db.transaction(
            tx => {
                tx.executeSql(DELETE_REPSONSE_BY_ID_SQL, args, (_, _) => {console.log("success delete response")}, (_, err) => {console.log("Error delete response", err)});
            },
            (err) => {console.log(err)},
            () => {console.log("deleted response")}
        );
    }; 
};


export default LocalDB = { 
    SetupLocalDB, 
    InsertQuestions, 
    GetQuestion, 
    DeleteQuestions,
    DeleteQuestionsByGuid,
    DeleteAllQuestions,
    UpdateQuestions,
    GetNextUnansweredQuestion,
    InsertResponses,
    GetResponsesToUpload,
    DeleteResponses
};
