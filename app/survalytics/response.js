'use strict';
import { AsyncStorage } from 'react-native';

import { GetDeviceInfo, GetLocalInfo } from './device';
import { APPLICATION_VERSION, APPLICATION_NAMESPACE } from '../config/constants';


export const NewResponse = (id, json, uploaded) => {
    var result = {};
    result.id = id;
    if (typeof json == "string") {
        result.json = JSON.parse(json) || {};
    } else {
        result.json = JSON.parse(JSON.stringify(json)) || {};
    }
    result.uploaded = uploaded;

    if (typeof result.json.userguid_str == "undefined") {
        result.json = JSON.parse(JSON.stringify(_addHeader(result.json)));    
    };
    return result;
};


export const NewResponseFromQuestion = (q) => {
    var response_json = {};
    response_json.entrytype_str = "survey";
    response_json.surveyguid_str = q.json_str.surveyguid_str;
    response_json.questionguid_str = q.questionguid_str;
    response_json.questionprompt_str = q.json_str.questionprompt_str;
    response_json.response_str = q.final_response_str;
    response_json.responseid_int = q.final_responseid_int;

    if (q.json_str.questiontype_str == 'TYPE_CHECKBOXES') {
        response_json.responses_arr = q.final_response_str;
    }

    var response = NewResponse(null, response_json, 0);

    return response;
};

export const CloneResponse = (r) => {
    return JSON.parse(JSON.stringify(r));
}

const _addHeader = async (json) => {
    var result = JSON.parse(JSON.stringify(json));
    result.userguid_str = (await AsyncStorage.getItem('@UserGUID_Str')) || "UNDEFINED";

    let data = await Promise.all([GetLocalInfo(), GetDeviceInfo()]);

    result.application_version = APPLICATION_VERSION;
    result.application_namespace_str = APPLICATION_NAMESPACE;

    return Object.assign({}, result, data[0], data[1]);
};

