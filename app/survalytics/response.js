'use strict';
import { AsyncStorage } from 'react-native';
import { Location } from 'expo';

import { GetDeviceInfo, GetLocalInfo } from 'device';
import { GetGeolocation, GetIpApiInfo, IsOnline } from 'network';

import { APPLICATION_VERSION, APPLICATION_NAMESPACE } from '../config/constants';

class Response {
    constructor(id, json, uploaded) {
        this.id = id
        this.json = JSON.parse(json) || {};
        this.uploaded = uploaded;

        if (typeof this.json.userguid == "undefined") {
            this._addHeader(); // explicitly only do this once
        }
    };


    _addHeader = () => {
        this.json.userguid_str = (await AsyncStorage.getItem('@UserGUID_Str')) || "UNDEFINED";
        
        var local_info = GetLocalInfo().then((data) => {
            return data;
        }).catch((err) => {
            return {};
        });

        var device_info = GetDeviceInfo().then((data) => {
            return data;
        }).catch((err) => {
            return {};
        });

        this.json.application_version = APPLICATION_VERSION;
        this.json.application_namespace_str = APPLICATION_NAMESPACE;

        this.json = Object.assign({}, this.json, local_info, device_info);
    };
}


export default Response;