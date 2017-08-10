'use strict';

export const SET_LOGVALUE = 'SET_LOGVALUE';

export const LOG_TYPE_ERROR = 'ERROR'
export const LOG_TYPE_INFO  = 'INFO'

export function logError(functionName, errorMsg) {
    return {
        type: SET_LOGVALUE,
        functionName: functionName,
        logType: LOG_TYPE_ERROR,
        msg: errorMsg
    }
}

export function logInfo(functionName, infoMsg) {
    return {
        type: SET_LOGVALUE,
        functionName: functionName,
        logType: LOG_TYPE_INFO,
        msg: infoMsg
    }
}