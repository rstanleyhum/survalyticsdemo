'use strict';

import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { submitTextAnswer, changeTextAnswer } from '../actions/answer';
import TextEntry from '../components/textentry';

const SUBMITCOLOR = 'yellow';

const styles = StyleSheet.create({
    textinputstyle: {
        color: 'red',
    },
    labelstyle: {
        color: 'blue',
    }
});


const mapStateToProps = (state) => {
    return {
        textinputstyle: styles.textinputstyle,
        text: state.question.inferred.text_values.text_answer_text,
        labelstyle: styles.labelstyle,
        label: state.question.inferred.text_values.text_response_text,
        submitcolor: SUBMITCOLOR
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitPress: () => {
            dispatch(submitTextAnswer());
        },
        onChangeText: (text) => {
            dispatch(changeTextAnswer(text));
        }
    }
}



const TextAnswer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TextEntry)

export default TextAnswer
