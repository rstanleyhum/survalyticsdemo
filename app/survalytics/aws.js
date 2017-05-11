'use strict';

import { IsOnline } from 'network';


// AWS login and table information
var awsConstants = require("../assets/secrets.json");

var myCredentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsConstants.IDENTITY_POOL_ID,
    RoleARN: awsConstants.UNAUTH_ROLE_ARN
},{region: awsConstants.AWS_US_EAST1_REGION});


var dynamodb = new AWS.DynamoDB({
    credentials: myCredentials,
    region: awsConstants.AWS_US_EAST2_REGION,
    endpoint: awsConstants.AWS_US_WEST2_REGION
});






export const Download = (immediate) => {
    var current_size;

    IsOnline.then( (isConnected) => {
        if (!isConnected) {
            throw false;
        }
        var params = {
            TableName: awsConstants.QUESTIONTABLENAME
        };
        return dynamodb.describeTable(params).promise();

    }).then( (data) => {
        current_size = data.Table.TableSizeBytes;
        var old_size = (await AsyncStorage.getItem('@TableSize')) || 0;

        if ((current_size == old_size) && !immediate) {
            throw false;
        }

        var params = {
            TableName: awsConstants.QUESTIONTABLENAME,
            ConsistentRead: true,
            Limit: 10
        };
        var list = [];
        return loadTableItems(params, list);
    }).then( (data) => {
        new_questions_list = _processDownloadedData(data);
        await AsyncStorage.setItem('@TableSize:key', current_size);
        if (new_questions_list) {
            return true;
        } else {
            return false;
        }
    }).catch( () => {
        return false;
    });
};


const loadTableItems = (params, list) => {

    var p = new Promise( (resolve, reject) => {
        dynamodb.scan(params, (err, data) => {
            if (err) {
                reject(null);
            } else {
                Array.prototype.push.apply(list, data.Items);

                if (typeof data.LastEvaluatedKey != "undefined") {
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    loadTableItems(params, list).then( () => {
                        resolve(list);
                    });
                } else {
                    resolve(list);
                }
            }
        })
    });

    return p;
}


const _processDownloadedData = (data) => {
    var new_questions_list = [];
    var num_items = data.length;
    for (var i = 0; i < num_items; i++) {
        var q = new Question(data[i].questionguid_str, data[i].json_str, data[i].ordinalposition_int);

        if (typeof q.DeleteQuestionGUID == "undefined") {
            DeleteQuestions([q]);
            continue;
        }

        if (GetQuestion(q.questionguid) != null) {
            continue;
        }

        InsertQuestion([q]);

        new_questions_list.push(q);
    }
    return q;
}



export const Upload = () => {

    var responses = [];
    var geodata;

    IsOnline.then( (isConnected) => {
        if (!isConnected) {
            throw false;
        }

        responses = GetResponsesToUpload();

        if (!responses) {
            throw true;
        }

        // upload to aws
        

    }).then( (data) => {
        // delete from local
    }).catch( (status) => {
        return status;
    });
    
    return true;
};


export default AWSService = {
    Download,
    Upload
};


