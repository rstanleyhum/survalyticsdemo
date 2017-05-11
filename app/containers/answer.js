'user strict';

import { connect } from 'react-redux';

import AnswerEntry from '../components/answerentry';

const mapStateToProps = (state) => {
    return {
        entrytype: STYLE,
        buttonstype: TEXT,
        texttype: STYLE,
        slidertype: LABEL,
        checkboxestype: COLOR
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
