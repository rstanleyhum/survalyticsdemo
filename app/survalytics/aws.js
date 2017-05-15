'use strict';

import { Location } from 'expo';
import { AsyncStorage } from 'react-native';
var AWS = require('aws-sdk/dist/aws-sdk-react-native');

import { IsOnline, GetGeolocation, GetIpApiInfo } from './network';
import { GetAllQuestions, DeleteQuestionsByGuid, DeleteQuestion, GetQuestion, InsertQuestions, GetResponsesToUpload, DeleteResponses } from './localdb';
import { NewQuestion, DeleteQuestionGUID } from './question';

console.log(typeof IsOnline);

var awsConstants = require('../assets/secrets.json');
//var awsReturnDataTxt = require('../assets/aws_data.data.txt');


console.log(awsConstants);

var myCredentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsConstants.IDENTITY_POOL_ID,
    RoleARN: awsConstants.UNAUTH_ROLE_ARN
},{region: awsConstants.AWS_US_EAST1_REGION});


var dynamodb = new AWS.DynamoDB({
    credentials: myCredentials,
    region: awsConstants.AWS_US_WEST2_REGION,
    endpoint: awsConstants.AWS_US_WEST2_ENDPOINT,
    dynamoDbCrc32: false
});


export const Download = (immediate = false) => {
    var p = new Promise( (resolve, reject) => {
        var current_size;

        IsOnline().then( (isConnected) => {
            if (!isConnected) {
                throw false;
            }
            var params = {
                TableName: awsConstants.QUESTIONTABLENAME
            };
            return dynamodb.describeTable(params).promise();

        }).then( async (data) => {
            current_size = data.Table.TableSizeBytes;
            let old_size = parseInt(await AsyncStorage.getItem('@TableSize')) || 0;

            if ((current_size == old_size) && !immediate) {
                throw false;
            }

            var params = {
                TableName: awsConstants.QUESTIONTABLENAME,
                ConsistentRead: true,
                Limit: 10
            };
            var list = [];
            console.log("before Promise all");
            return Promise.all([_loadTableItems(params, list), GetAllQuestions()]);
        }).then( async (return_data) => {
            console.log("after Promise all");
            let server_questions_json = return_data[0];
            let local_questions = return_data[1];
            return _processDownloadedData(server_questions_json, local_questions);
        }).then( async (processed_data) => {
            console.log("after processed data");
            await AsyncStorage.setItem('@TableSize:key', current_size.toString());
            console.log(processed_data);
            //if (processed_data[0].length > 0) {
            //    resolve(true);
            //} else {
            //    resolve(false);
            //}
            resolve(true);
        }).catch( (error) => {
            console.log("Download: catch: " + error);
            reject(false);
        });
    });
    return p;
};


const _loadTableItems = (params, list) => {
    var p = new Promise( (resolve, reject) => {
        dynamodb.scan(params, (err, data) => {
            if (err) {
                reject(null);
            } else {
                Array.prototype.push.apply(list, data.Items);

                if (typeof data.LastEvaluatedKey != "undefined") {
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    _loadTableItems(params, list).then( () => {
                        resolve(list);
                    });
                } else {
                    resolve(list);
                }
            }
        })
    });

    return p;
};


const _processDownloadedData = (server_questions_json, local_questions) => {
    var new_questions_list = [];
    var data = server_questions_json;
    var num_items = data.length;
    
    var delete_question_guids = [];
    
    var local_questions_guids = local_questions.map( (item, idx) => {
        return item.questionguid_str;
    });

    var questions_to_delete = [];
    for (var i = 0; i < num_items; i++) {
        var q = NewQuestion(data[i].questionguid_str.S, data[i].json_str.S, data[i].ordinalposition_int.N);

        var deleteguid = DeleteQuestionGUID(q);

        if (deleteguid != null) {
            delete_question_guids.push(deleteguid);
            continue;
        };

        if (local_questions_guids.indexOf(q.questionguid_str) >= 0) {
            continue;
        }
        new_questions_list.push(q);
    }



    var p1 = DeleteQuestionsByGuid(delete_question_guids);
    var p2 = InsertQuestions(new_questions_list);
    
    return Promise.all([p1, p2]);
};


const _getLocationAsync = async () => {
    // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // if (status !== 'granted') {
    //     // error message
    // }
    let location = await Location.getCurrentPositionAsync({});
    return location;
}


export const Upload = () => {
    var p = new Promise( (resolve, reject) => {
        var responses = [];
        var geodata;

        IsOnline().then( async (isConnected) => {
            if (!isConnected) {
                throw false;
            }

            let location = await _getLocationAsync();
            
            return Promise.all([
                GetResponsesToUpload(),
                GetGeolocation(location.coords.latitude, location.coords.longitude),
                GetIpApiInfo()
            ]);
        }).then( async (data) => {
            var responses = data[0];
            var geolocation = data[1] || {};
            var ipapiinfo = data[2] || {};

            var num_responses = responses.length;
            for (i = 0; i < num_responses; i++) {
                let item_json = Object.assign({}, responses[i].json, geolocation, ipapiinfo);
                let item = JSON.stringify(item_json);
                let params = {
                    TableName: awsConstants.RESPONSETABLENAME,
                    Item: {
                        "json": {
                            S: item
                        }
                    }
                };
                dynamodb.putItem(params, function(err, data) {
                    if (!err) {
                        DeleteResponses([response[i]]);
                    }
                });
            }
            resolve(true);
        }).catch( (status) => {
            reject(status);
        });
        
        resolve(true);
    });
    return p;
};



