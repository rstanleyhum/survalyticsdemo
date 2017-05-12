'use strict';

import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { skipQuestion } from '../actions/answer';
import QuestionPage from '../components/questionpage';


const SKIPBUTTONCOLOR = 'red';

const styles = StyleSheet.create({
    p: {
        color: 'red',
    }
});



const mapStateToProps = (state) => {
    return {
        skipcolor: SKIPBUTTONCOLOR,
        htmlcontent: state.question.json_str.questionprompt_str,
        stylesheet: styles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSkipPressed: () => {
            dispatch(skipQuestion());
        }
    }
}

const Question = connect(
    mapStateToProps,
    mapDispatchToProps,
)(QuestionPage)

export default Question
