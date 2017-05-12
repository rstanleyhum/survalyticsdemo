'use strict';

import { connect } from 'react-redux';

import AnswerEntry from '../components/answerentry';
import { TYPE_BUTTONS, TYPE_TEXT, TYPE_CHECKBOXES, TYPE_SLIDER } from '../survalytics/question';

const mapStateToProps = (state) => {
    return {
        entrytype: state.question.json_str.questiontype_str,
        buttonstype: TYPE_BUTTONS,
        texttype: TYPE_TEXT,
        slidertype: TYPE_SLIDER,
        checkboxestype: TYPE_CHECKBOXES
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const Answer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AnswerEntry)

export default Answer
