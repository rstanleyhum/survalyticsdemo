'use strict';


class Response {
    constructor(id, json, uploaded) {
        this.id = id
        this.json = JSON.parse(json) || {};
        this.uploaded = uploaded;

        if (typeof this.json.userguid != "undefined") {
            return;
        }

        this._addHeader();
        this._addGeolocation();
        this._addIpApi();
    };


    _addHeader = () => {
        this.json.userguid = 'TODO';
        // userguid
        // locale
        // device
        // application
        // time
        // phone service
    };

    _addGeolocation = () => {
        // add geolocation
    }

    _addIpApi = () => {
        // add ipapi
    };

}


export default Response;