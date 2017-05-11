'user strict';

import { connect } from 'react-redux';

import ButtonsEntry from '../components/buttonsentry';

const mapStateToProps = (state) => {
    return {
        buttonsinfo: state.question.inferred.button_values,
        buttoncolor: BUTTON_COLOR,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPress: (item) => {
            dispatch(buttonPushed());
        }
    }
}

const ButtonsAnswer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ButtonsEntry)

export default ButtonsAnswer
