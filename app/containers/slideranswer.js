'use strict';

import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { updateSliderValue, submitSliderAnswer } from '../actions/answer';
import SliderEntry from '../components/sliderentry';

const SUBMITCOLOR = 'orange';

const styles = StyleSheet.create({
    sliderrangelabelstyle: {
        color: 'red',
    },
    sliderlabelstyle: {
        color: 'blue',
    },
    sliderstyle: {
        color: 'purple',
    },
    labelstyle: {
        color: 'yellow',
    }
})

const mapStateToProps = (state) => {
    return {
        sliderrangelabelstyle: styles.sliderrangelabelstyle,
        rangelabel: "min ---- max",
        sliderlabelstyle: styles.sliderlabelstyle,
        sliderstyle: styles.sliderstyle,
        submitcolor: SUBMITCOLOR,
        maxvalue: state.question.inferred.slider_values.slider_max,
        minvalue: state.question.inferred.slider_values.slider_min,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSliderValue: (value) => {
            dispatch(updateSliderValue(value));
        },
        onSubmitPress: () => {
            dispatch(submitSliderAnswer());
        }
    }
}

const SliderAnswer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SliderEntry)

export default SliderAnswer
