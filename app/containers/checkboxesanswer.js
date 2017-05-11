'user strict';

import { connect } from 'react-redux';

import CheckBoxesEntry from '../components/checkboxesentry';

const mapStateToProps = (state) => {
    return {
        checkboxesinfo: state.question.inferred.checkbox_values,
        labelstyle: STYLE,
        submitcolor: COLOR
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitPress: () => {
            dispatch(buttonPushed());
        },
        onChange: (item, checked) => {
            
        }
    }
}

const CheckBoxesAnswer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CheckBoxesEntry)

export default CheckBoxesAnswer
