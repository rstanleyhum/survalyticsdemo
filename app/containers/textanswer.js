'user strict';

import { connect } from 'react-redux';

import CheckBoxesEntry from '../components/checkboxesentry';

const mapStateToProps = (state) => {
    return {
        textinputstyle: STYLE,
        text: TEXT,
        labelstyle: STYLE,
        label: LABEL,
        submitcolor: COLOR
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitPress: () => {
            dispatch(buttonPushed());
        },
        onChangeText: (text) => {
            
        }
    }
}

const TextAnswer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TextEntry)

export default TextAnswer
