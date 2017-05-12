'use strict';

import { connect } from 'react-redux';

import { submitButtonsAnswer } from '../actions/answer';
import ButtonsEntry from '../components/buttonsentry';

const BUTTON_COLOR = 'yellow';

const mapStateToProps = (state) => { 
    return {
        buttonsinfo: state.question.inferred.button_values.map( (v, k) => {
            return { name: v.button_response_text }
        }),
        buttoncolor: BUTTON_COLOR,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPress: (item) => {
            dispatch(submitButtonsAnswer(item));
        }
    }
}

const ButtonsAnswer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ButtonsEntry)

export default ButtonsAnswer
