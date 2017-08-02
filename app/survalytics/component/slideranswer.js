'use strict';

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, Slider, TouchableOpacity } from 'react-native';

import { updateSliderValue, submitSliderAnswer } from '../actions/answer';


const SUBMITCOLOR = 'grey';


const styles = StyleSheet.create({
    sliderrangelabelstyleleft: {
        color: 'black',
    },
    sliderrangelabelstyleright: {
        color: 'black',
    },
    sliderlabelstyle: {
        color: 'black',
        alignContent: 'center',
        textAlign: 'center'
    },
    sliderstyle: {
        backgroundColor: 'grey',
    },
    sliderlabelcontainer: {
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
    },
    inner: {
        flex: 1,
        alignContent: 'center',
        marginTop:15,
        marginBottom:10,
        marginRight:20,
        marginLeft:20,
    },
    button: {
        padding: 5,
        marginTop: 5,
        backgroundColor: 'cyan',
        alignItems: 'center',
        justifyContent: 'center'
    },
})


const SliderAnswer = ({value, maxvalue, minvalue, onValueChange, onSubmitPress}) => (
    <View>
        <View style={styles.inner}>
            <View style={styles.sliderlabelcontainer}>
                <Text style={styles.sliderrangelabelstyleleft }>Min:{minvalue}</Text>
                <Text style={styles.sliderrangelabelstyleright}>Max:{maxvalue}</Text>
            </View>
            <Slider 
                maximumValue={maxvalue}
                minimumValue={minvalue}
                style={styles.sliderstyle}
                onValueChange={ (value) => onValueChange(value) }
            />
            <Text style={styles.sliderlabelstyle }>{value}</Text>
        </View>
        <TouchableOpacity 
            onPress={onSubmitPress}
            style={styles.button}
        >
            <Text>Submit</Text>
        </TouchableOpacity>
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
