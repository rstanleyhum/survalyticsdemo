'use strict';

/**
 * 
 * This structure holds the current question. The list of questions is always kept in the SQLITE db. This structure drives the display
 * of the question/answer. It may also drive some of the response loading.
 * 
 * Unlike the C# version of Survalytics, the Javascript version stores each question in
 * JSON objects because it is a natural fit.
 * 
 * The object structure is:
 * 
 * {
 *      "questionguid" : STRING,
 *      "json_str"     : 
 *          {
 *              "surveyname_str"        : STRING,
 *              "surveyguid_str"        : STRING,
 *              "ordinalposition_int"   : INT,
 *              "questionguid_str"	    : STRING,
 *              "questionprompt_str"	: STRING,
 *              "questiontype_str"	    : STRING,
 *              "responses_arr"		    : 
 *                  [
 *                      {
 *                          "responseid_int" : INTEGER,
 *                          "response_str"	 : STRING,
 *                      },...
 *                  ],
 *        	    "conditional_upon_questionguid_str"	: STRING,
 *              "conditional_upon_responseid_arr'	:
 *                  [
 *                      {
 *                          "conditional_upon_responseid_int" : INTEGER
 *                      },...
 *                  ],
 *              "conditionalbycountry_str"      : STRING,
 *              "conditional_upon_datemsid_int"	: INTEGER,
 *              "delaybydays_int"   			: INTEGER,
 *              "ongoingquestion_arr"			: 
 *                  [
 *                      {
 *                          "notificationtime_str" 	: STRING,
 *                      },...
 *          		],
 *              "deletequestion_str"			: STRING,
 *          },
 *      "ordinalposition_int"  : INTEGER,
 *      "final_responseid_int" : INTEGER,
 *      "final_response_str"   : STRING,
 *      "answered_bool"        : INTEGER,
 *
 *   Calculated variables ***
 * 
 *      "inferred" :
 *          {
 *              "button_values" :
 *                  [
 *                      {
 *                          "button_response_text" : STRING,
 *                          "button_response_id"   : INTEGER,
 *                          "button_selected"      : BOOLEAN
 *                      }, ...
 *                  ],
 *              "text_values" :
 *                  {
 *                      "text_response_text" : STRING,
 *                      "text_answer_text"   : STRING
 *                  },
 *              "slider_values" :
 *                  {
 *                      "slider_min"   : INTEGER,
 *                      "slider_max"   : INTEGER,
 *                      "slider_value" : INTEGER
 *                  },
 *              "checkbox_values" :
 *                  [
 *                      {
 *                          "checkbox_answer_response_text" : STRING,
 *                          "checkbox_answer_response_id"   : INTEGER,
 *                          "checkbox_answer_checked"       : BOOLEAN
 *                      }, ...
 *                  ]
 *          }
 * }
 * 
 * - all of the functions are either getters and setters or conditionals
 * - very few actually do much complex changes
 * 
 */



class Question {
    
    constructor(questionguid_str, json_str, ordinalposition_int, final_responseid_int = 0, final_response_str = '', ongoingquestion_int = null, answered_bool = 0, uploaded_int = 0) {
        this.questionguid_str = questionguid_str;
        this.json_str = JSON.parse(json_str) || {};
        this.ordinalposition_int = ordinalposition_int;
        this.final_responseid_int = final_responseid_int;
        this.final_response_str = final_response_str;
        this.answered_bool = answered_bool;
        if (typeof this.json_str.deletequestion_str == "undefined") {
            return;
        }

        if (ongoingquestion_int != null) {
            this.ongoingquestion_int = ongoingquestion_int;
        } else {
            this.ongoingquestion_int = (typeof this.json_str.ongoingquestion_arr != 'undefined') ? 1 : 0;
            this.answered_bool = 1;
        }

        if (typeof this.json_str.delaybydays_int != 'undefined') {
            this.json_str.conditionalqdataTODO = todays_date + this.json_str.delaybydays;
            delete this.json_str[delaybydays_int];
        }

        this.uploaded_int = uploaded_int;

        this.inferred = _calculatedInferred();
    }


    DeleteQuestionGUID = () => {
        return this.json_str.deletequestion_str;
    }


    _calculatedInferred = () => {
        var button_values = [];
        var text_values = {
            text_response_text: "",
            text_answer_text: ""
        };
        var slider_values = {
            slider_min: 0,
            slider_max: 0,
            slider_value: 0
        };
        var checkbox_values = [];

        if (this.json_str.questiontype_str === 'TYPE_BUTTONS') {
            button_values = _getButtonResponseStructure();
        }

        if (this.json_str.questiontype_str === 'TYPE_TEXT') {
            text_values = _getTextResponseStructure();
        }

        if (this.json_str.questiontype_str === 'TYPE_SLIDER') {
            slider_values = _getSliderResponseStructure();
        }

        if (this.json_str.questiontype_str === 'TYPE_CHECKBOXES') {
            checkbox_values = _getCheckboxResponseStructure();
        }

        return {
            button_values: button_values,
            text_values: text_values,
            slider_values: slider_values,
            checkbox_values: checkbox_values
        }
    };


    _getButtonResponseStructure = () => {

        if (typeof this.json_str.responses_arr == 'undefined') {
            return [];
        }

        return this.json_str.responses_arr.map( (item) => {
            return {
                button_response_text: item.response_str,
                button_response_id:   item.responseid_int,
                button_selected: false
            }
        });
    };


    _getTextResponseStructure = () => {
        var result = {
            text_response_text: "",
            text_answer_text: "",
        };

        if (typeof this.json_str.responses_arr == 'undefined') {
            return result;
        }

        if (typeof this.json_str.responses_arr[0] == 'undefined') {
            return result;
        }

        result.text_response_text = this.json_str.responses_arr[0].response
        return result;
    };


    _getSliderResponseStructure = () => {
        var result = {
            slider_min: 0,
            slider_max: 0,
            slider_value: 0
        };
        
        if (typeof this.json_str.responses_arr == 'undefined') {
            return result;
        }

        if (typeof this.json_str.responses_arr[0] != 'undefined') {
            result.slider_min = parseInt(this.json_str.responses_arr[0].response_str) || 0
        }

        if (typeof this.json_str.responses_arr[1] != 'undefined') {
            result.slider_max = parseInt(this.json_str.responses_arr[1].response_str) || 0
        }

        return result;
    };


    _getCheckboxResponseStructure = () => {
        var result = [];

        if (typeof this.json_str.responses_arr == 'undefined') {
            return result;
        }

        return this.json_str.responses_arr.map( (item) => {
            return {
                checkbox_answer_response_text: item.response_str,
                checkbox_answer_response_id: item.responseid_int,
                checkbox_answer_checked: false
            }
        })
    };


    IsRelevantConditionalQuestion = (q) => {
        if (this.ongoingquestion_int || this.answered_bool) {
            return false;
        }

        var conditional_time = this.json_str.conditional_upon_datemsid_int

        if ((typeof conditional_time != 'undefined') && (current_time < conditional_time)) {
            return false;
        }

        var conditional_guid = this.json_str.conditional_upon_questionguid_str;
        
        if (typeof conditional_guid == 'undefined') {
            return true;
        }

        var original = GetQuestion(conditional_guid);

        if ((original == null) || (!original.answered_bool)) {
            return false;
        }

        var conditional_response_array = this.json_str.conditional_upon_responseid_arr;

        var result = this._compareConditionalResponses(conditional_guid, original.questiontype_str, conditional_response_array, original.final_response_str);

        return result;
    }


    _compareConditionalResponses =  (cond_guid, questiontype, conditional, original) => {
        if (questiontype == 'TYPE_CHECKBOXES') {
            return _compareConditionalCheckboxesResponses(cond_guid, conditional, original);
        } else if (questiontype == 'TYPE_SLIDER') {
            return _compareConditionalSliderResponses(conditional, original);
        } else if (questiontype == 'TYPE_BUTTONS') {
            return _compareConditionalButtonsResponses(conditional, original);
        }

        return false;
    }


    _compareConditionalCheckboxesResponses = (cond_guid, cond, orig) => {

        var orig_answers = JSON.parse(orig);
        var num_orig_answers = orig_answers.length;

        for (var i = 0; i < num_orig_answers; i++ ) {

            var original_answer_str = orig_answers[i].XXXXX;
            var num_cond_responses = cond.length;

            for (var j = 0; j < num_cond_responses; j++) {

                var cond_answer_str = cond_guid + "-" + cond[j].conditional_upon_responseid_int.toString();

                if (cond_answer_str == original_answer_str) {
                    return true;
                }
            }

        }
        return false;
    }


    _compareConditionalSliderResponses = (cond, orig) => {

        var num_cond_responses = cond.length;

        if (num_cond_responses < 2) {
            return false;
        }

        var lowerbound = cond[0].conditional_upon_responseid_int;
        var upperbound = cond[1].conditional_upon_responseid_int;

        if (!(lowerbound || upperbound)) {
            return false;
        }

        var orig_value = parseFloat(orig);

        if ((orig_value >= lowerbound) && (orig_value <= upperbound)) {
            return true;
        }

        return false;
    }


    _compareConditionalButtonsResponses = (cond, orig) => {
        var orig_value = parseInt(orig);

        var num_cond_responses = cond.length;

        for (var i = 0; i < num_cond_responses; i++) {
            if (orig_value == cond[i].conditional_upon_responseid_int) {
                return true;
            }
        }

        return false;
    }


    UpdateQuestion = () => {

        var responses = this._createQuestionTypeResponse();

        if ((responses.final_response_str == "") && (repsonses.final_responseid_int == 0)) {
            return false;
        }
        this.answered_bool = 1;
        this.final_response_str = responses.final_response_str;
        this.final_responseid_int = responses.final_responseid_int;

        UpdateQuestions([this]);

        return true;
    }

    GetResponse = () => {
        
        var response_json = {};
        response_json.entrytype_str = "survey";
        response_json.surveyguid_str = this.json_str.surveyguid_str;
        response_json.questionguid_str = this.questionguid;
        response_json.questionprompt_str = this.json_str.questionprompt_str;
        response_json.response_str = this.final_response_str;
        response_json.responseid_int = this.final_responseid_int;

        if (this.json_str.questiontype_str == 'TYPE_CHECKBOXES') {
            response_json.responses_arr = this.final_response_str;
        }

        var response = new Response(null, response_json, false);

        return response;
    }


    _createQuestionTypeResponse = () => {
        var response_str = "";
        var response_id = 0;

        if (this.json_str.questiontype_str == 'TYPE_BUTTONS') {
            var num_buttons = this.inferred.button_values.length;
            for (var i = 0; i < num_buttons; i++) {
                if (this.inferred.button_values[i].button_selected) {
                    response_str = this.inferred.button_values[i].button_response_text;
                    response_id = this.inferred.button_values[i].button_response_id;
                    break;
                }
            }
        }

        if (this.json_str.questiontype_str == 'TYPE_TEXT') {
            response_str = this.inferred.text_values.text_answer_text;
            response_id = -499;
        }

        if (this.json_str.questiontype_str == 'TYPE_SLIDER') {
            response_str = this.inferred.slider_values.slider_value;
            response_id = -498;
        }

        if (this.json_str.questiontype_str == 'TYPE_CHECKBOXES') {
            results = [];
            var num_checkboxes = this.inferred.checkbox_values.length;
            for (var i = 0; i < num_checkboxes; i++) {
                var checkbox = this.inferred.checkbox_values[i];
                if (checkbox.checkbox_answer_checked) {
                    var item = {};
                    item.response_str = checkbox.checkbox_answer_response_id.toString();
                    item.responseid_str = this.questionguid + "-" + checkbox.checkbox_answer_response_id.toString();
                    results.push(item);
                }
            }
            response_str = JSON.stringify(results);
            response_id = -497;
        }

        var responses = {};
        responses.final_response_str = response_str;
        responses.final_responseid_int = response_id;

        return response;
    }
}


export default Question




