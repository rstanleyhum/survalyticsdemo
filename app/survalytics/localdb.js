'use strict';

import { SQLite } from 'expo';

import { NewResponse } from './response';
import { NewQuestion, IsConditional, IsRelevantConditionalQuestion } from './question';


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

const SELECT_ALL_QUESTIONS_SQL = `SELECT * FROM questionlist;`;

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
    var p = new Promise( (resolve, reject) => {
            db.transaction(
            tx => {
                tx.executeSql(CREATE_QUESTION_TABLE_SQL, [], () => {console.log("tq created")}, () => {console.log("tq error creating")} );
                tx.executeSql(CREATE_RESPONSE_TABLE_SQL, [], () => {console.log("tr created")}, () => {console.log("tr error creating")} );
            },
            (err) => {
                resolve(false);
            },
            () => {
                resolve(true);
            }
        );
    });
    return p;
};


export const InsertQuestion = (q) => {
    var p = new Promise( (resolve, reject) => {
        let args = [
            q.ordinalposition_int,
            q.questionguid_str,
            JSON.stringify(q.json_str),
            q.final_responseid_int,
            q.final_response_str,
            q.ongoingquestion_int || 0,
            q.answered_bool,
            q.uploaded_int || 0
        ];
        db.transaction(
            tx => {
                tx.executeSql(INSERT_QUESTION_SQL, args, () => {
                    resolve(true);
                },
                (tx, err) => {
                    console.log(err);
                    resolve(false);
                })
            },
            (err) => {
                console.log(err);
                resolve(false);
            },
            () => {
                resolve(true);
            }
        );

    });
    return p;
};


export const InsertQuestions = (questions) => {
    var p = new Promise( (resolve, reject) => {
        let processes = questions.map( (q, idx) => {
            return InsertQuestion(q);
        });
        Promise.all(processes)
            .then( (data) => {
                console.log(data);
                resolve(true);
            })
            .catch( (err) => {
                console.log(err);
                resolve(false);
            }); 
    });
    return p;
};


export const GetAllQuestions = () => {
    var p = new Promise( (resolve, reject) => {
        var questions = [];
        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM questionlist;", [], (tx, rs) => {
                    let num_results = rs.rows.length;
                    for (var i = 0; i < num_results; i++) {
                        let data = rs.rows._array[i];
                        var q = NewQuestion(data.questionguid_str, data.json_str, data.ordinalposition_int, data.final_responseid_int, data.final_response_str, data.ongoingquestion_int, data.answered_int, data.uploaded_int);
                        questions.push(q);
                        console.log(JSON.stringify(q, null, 4));
                    }
                },
                (tx, err) => {console.log(err)})
            },
            (err) => {
                console.log(err);
                reject([]);
            },
            () => {
                console.log(questions.length);
                resolve(questions);
            }
        );
    });
    return p;
};


export const GetQuestion = (guid) => {
    var p = new Promise( (resolve, reject) => {
        var result = {};
        var args = [
            guid
        ];

        db.transaction(
            tx => {
                tx.executeSql(SELECT_QUESTION_BY_GUID_SQL, args, (tx, rs) => {
                        if (rs.length > 1) {
                            reject(new Error("database corrupted two questions with same guid"));
                        }
                        result = Object.assign({}, rs.rows._array);
                        resolve(result);
                    },
                    (_, err) => {
                        console.log(err);
                        resolve(null);
                    }
                );
            },
            (err) => {
                console.log(err);
                resolve(null);
            },
            () => { 
                console.log(guid, "success", result);
                if (Object.keys(result).length === 0 && result.constructor === Object) {
                    console.log("returning null");
                    resolve(null);
                }
                var item = result[0];

                var q = NewQuestion(
                    item.questionguid_str,
                    item.json_str,
                    item.ordinalposition_int,
                    item.final_responseid_int,
                    item.final_response_str,
                    item.answered_int
                );
                resolve(q);
            }
        );
    });
    return p;
};


export const DeleteQuestions = (questions) => {
    var questionguids = questions.map( (q, idx) => {
        return q.questionguid_str;
    });
    return DeleteQuestionsByGuid(questionguids);
};


export const DeleteQuestionByGuid = (guid) => {
    var p = new Promise( (resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql(DELETE_QUESTION_BY_QUESTIONGUID_SQL, [guid], () => {console.log("success")}, (tx, err) => {console.log(err)});
                (err) => {
                    console.log(err);
                    resolve(false);
                },
                () => {
                    resolve(true);
                }
            }
        )
    });
    return p;
};


export const DeleteQuestionsByGuid = (questionguids) => {
    var p = new Promise( (resolve, reject) => {
        let processes = questionguids.map( (guid, idx) => {
            return DeleteQuestionByGuid(guid);
        });
        Promise.all(processes)
            .then( () => {
                resolve(true);
            })
            .catch( (err) => {
                console.log(err);
                resolve(false);
            });
    });
    return p;
};


export const DeleteAllQuestions = () => {
    var p = new Promise( (resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql(DELETE_ALL_QUESTIONS_SQL, [], () => {}, (_, err) => {console.log("all questions deleted error", err)} );
            },
            (err) => {
                console.log(err);
                resolve(false);
            },
            () => {
                resolve(true);
            }
        );
    });
    return p;
};


export const UpdateQuestions = (questions) => {
    var p = new Promise( (resolve, reject) => {
        let questionguids = questions.map( (item, idx) => {
            return item.questionguid_str;
        });
        DeleteQuestionsByGuid(questionguids)
            .then( (success) => {
                return InsertQuestions(questions);
            })
            .then( (x) => {
                resolve(x);
            })
            .catch( (err) => {
                console.log(err);
                reject(err);
            });
    });
    return p;
};


export const GetNextUnansweredQuestion = () => {
    var p = new Promise( (resolve, reject) => {
        var row_results = [];
        console.log("Start GetNextUnansweredQuestion");
        db.transaction(
            tx => {
//                tx.executeSql(SELECT_NEXT_UNANSWERED_QUESTION_SQL, [], (tx, rs) => {
                tx.executeSql("SELECT * FROM questionlist where answered_int = 0;", [], (tx, rs) => {
                        console.log("Hello");
                        console.log(rs);

                        if (rs.row._array) {
                            row_results = Object.assign({}, rs.rows._array);
                        };
                    },
                    (_, err) => {console.log("error getting question", err)}
                );
            },
            (err) => {
                console.log(err);
                resolve(null);
            },
            () => { 
                console.log("success");
                var num_results = row_results.length;
                
                for (var i = 0; i < num_results; i++) {
                    var item = row_results[i];
                    var q = NewQuestion(
                        item.questionguid_str,
                        item.json_str,
                        item.ordinalposition_int,
                        item.final_responseid_int,
                        item.final_response_str,
                        item.answered_int
                    );
            
                    if (!IsConditional(q)) {
                        resolve(q);
                    }

                    if (IsRelevantConditionalQuestion(q)) {
                        resolve(q);
                    }
                }
                resolve(null);
            }
        );
    });
    return p;
};


export const InsertResponse = (r) => {
    var p = new Promise( (resolve, reject) => {
        var args = [
            JSON.stringify(r.json),
            r.uploaded
        ];
        db.transaction(
            tx => {
                tx.executeSql(INSERT_RESPONSES_SQL, args, () => {}, (_, err) => {console.log("Error insert response", err)});
            },
            (err) => {
                console.log(err);
                resolve(false);
            },
            () => {
                console.log("inserted response");
                resolve(true);
            }
        );
    });
    return p;
}


export const InsertResponses = (responses) => {
     var p = new Promise( (resolve, reject) => {
         let processes = responses.map( (r, idx) => {
             return InsertResponse(r);
         });
         Promise.all(processes)
            .then( () => {
                resolve(true);
            })
            .catch( (err) => {
                reject(false);
            });
     });
     return p;
};


export const GetResponsesToUpload = () => {
    var p = new Promise( (resolve, reject) => {
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
            (err) => {
                console.log(err);
                reject(err);
            },
            () => { 
                let results = row_results.map( (row, idx) => {
                    return NewResponse(row._id, row.json, row.uploaded);
                });
                resolve(results);
            });
    });
    return p;
};


export const DeleteResponseByID = (rid) => {
    var p = new Promise( (resolve, reject) => {
        var args = [rid];
        db.transaction(
            tx => {
                tx.executeSql(DELETE_REPSONSE_BY_ID_SQL, args, () => {console.log("success delete response")}, (_, err) => {console.log("Error delete response", err)});
            },
            (err) => {
                console.log(err);
                resolve(false);
            },
            () => {
                resolve(true);
            });
    });
    return p;
};


export const DeleteResponses = (responses) => {
    var p = new Promise( (resolve, reject) => {
        let processes = responses.map( (r, idx) => {
            return DeleteResponseByID(r.id);
        });
        Promise.all(processes)
            .then( () => {
                resolve(true);
            })
            .catch( () => {
                resolve(false);
            });
    });
    return p;
};


