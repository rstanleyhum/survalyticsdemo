'use strict';

import { Location } from 'expo';
import { AsyncStorage } from 'react-native';
import AWS from 'aws-sdk';

import { IsOnline, GetGeolocation, GetIpApiInfo } from 'network';
import { DeleteQuestion, GetQuestion, InsertQuestions, GetResponsesToUpload, DeleteResponses } from 'localdb';


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
    var p = new Promise( (resolve, reject) => {
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
            return _loadTableItems(params, list);
        }).then( (data) => {
            new_questions_list = _processDownloadedData(data);
            await AsyncStorage.setItem('@TableSize:key', current_size);
            if (new_questions_list) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch( () => {
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
};


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

        InsertQuestions([q]);

        new_questions_list.push(q);
    }
    return q;
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

        IsOnline.then( (isConnected) => {
            if (!isConnected) {
                throw false;
            }

            let location = await _getLocationAsync();
            
            return Promise.all([
                GetResponsesToUpload(),
                GetGeolocation(location.coords.latitude, location.coords.longitude),
                GetIpApiInfo()
            ]);
        }).then( (data) => {
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


export default AWSService = {
    Download,
    Upload
};


