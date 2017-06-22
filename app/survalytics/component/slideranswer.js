'use strict';

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, Slider, Button } from 'react-native';

import { updateSliderValue, submitSliderAnswer } from '../actions/answer';


const SUBMITCOLOR = 'orange';


const styles = StyleSheet.create({
    sliderrangelabelstyle: {
        color: 'red',
    },
    sliderlabelstyle: {
        color: 'blue',
    },
    sliderstyle: {
        backgroundColor: 'purple',
    },
    labelstyle: {
        color: 'yellow',
    }
})


const SliderAnswer = ({value, maxvalue, minvalue, onValueChange, onSubmitPress}) => (
    <View>
        <Text style={styles.sliderrangelabelstyle }>{minvalue} ---- {maxvalue}</Text>
        <Text style={styles.sliderlabelstyle }>{value}</Text>
        <Slider 
            maximumValue={maxvalue}
            minimumValue={minvalue}
            style={styles.sliderstyle}
            onValueChange={ (value) => onValueChange(value) }
        />
        <Button 
            onPress={onSubmitPress}
            title="Submit"
            color= {SUBMITCOLOR}
        />
    </View>
);


SliderAnswer.propTypes = {
    value: PropTypes.number.isRequired,
    maxvalue: PropTypes.number.isRequired,
    minvalue: PropTypes.number.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onSubmitPress: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
    value: state.survalytic.currentq.question.inferred.slider_values.slider_value,
    maxvalue: state.survalytic.currentq.question.inferred.slider_values.slider_max,
    minvalue: state.survalytic.currentq.question.inferred.slider_values.slider_min,
});

const mapDispatchToProps = dispatch => ({
    onValueChange: (value) => dispatch(updateSliderValue(value)),
    onSubmitPress: () => dispatch(submitSliderAnswer())
});


export default connect(mapStateToProps,mapDispatchToProps)(SliderAnswer)
