'use strict';

import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { submitCheckBoxesAnswer, changeCheckBoxValue } from '../actions/answer';
import CheckBoxesEntry from '../components/checkboxesentry';


const SUBMITCOLOR = 'yellow';

const styles = StyleSheet.create({
    labelstyle: {
        color: 'red',
    }
});


const mapStateToProps = (state) => {
    return {
        checkboxesinfo: state.question.inferred.checkbox_values.map( (v, k) => {
            return { 
                name: v.checkbox_answer_repsonse_text,
                result: v.checkbox_answer_checked
            } 
        }),
        labelstyle: styles.labelstyle,
        submitcolor: SUBMITCOLOR
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitPress: () => {
            dispatch(submitCheckBoxesAnswer());
        },
        onChange: (item, checked) => {
            dispatch(changeCheckBoxValue(item, checked));            
        }
    }
}

const CheckBoxesAnswer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CheckBoxesEntry)

export default CheckBoxesAnswer
