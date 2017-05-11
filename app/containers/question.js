'user strict';

import { connect } from 'react-redux';

import QuestionPage from '../components/questionpage';

const mapStateToProps = (state) => {
    return {
        skipcolor: STYLE,
        htmlcontent: TEXT,
        stylesheet: STYLE
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSkipPressed: () => {

        }
    }
}

const Question = connect(
    mapStateToProps,
    mapDispatchToProps,
)(QuestionPage)

export default Question
