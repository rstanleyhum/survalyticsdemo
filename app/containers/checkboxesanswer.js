'use strict';

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import CheckBox from 'react-native-checkbox';

import { submitCheckBoxesAnswer, changeCheckBoxValue } from '../actions/answer';
import CheckBoxesEntry from '../components/checkboxesentry';


const SUBMITCOLOR = 'yellow';

const styles = StyleSheet.create({
    labelstyle: {
        color: 'red',
    }
});


const CheckBoxesAnswer = ({checkboxesinfo, onChange, onSubmitPress}) => {
    let CheckBoxesArray = this.props.checkboxesinfo.map( (item, idx) => {
        return (
            <View>
                <CheckBox 
                    labelStyle={styles.labelstyle} 
                    label={item.name} 
                    checked={item.result}
                    onChange={ (checked) => this.props.onChange(item, checked) }
                />
            </View>)
    });

    return (
        <View>
            {CheckBoxesArray}        
            <Button 
                onPress={onSubmitPress}
                title="Submit"
                color= {SUBMITCOLOR}
            />
        </View>
    )
};


CheckBoxesAnswer.propTypes = {
    checkboxesinfo: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmitPress: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
    checkboxesinfo: state.question.inferred.checkbox_values.map( (v, k) => {
        return { 
            name: v.checkbox_answer_repsonse_text,
            result: v.checkbox_answer_checked
        } 
    })
});

const mapDispatchToProps = dispatch => ({
    onSubmitPress: () => dispatch(submitCheckBoxesAnswer()),
    onChange: (item, checked) => dispatch(changeCheckBoxValue(item, checked))
});


export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxesAnswer);
