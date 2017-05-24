'use strict';

import { connect } from 'react-redux';
import { PropTypes } from 'react';
import { StyleSheet, View, Text, Slider, Button } from 'react-native';

import { updateSliderValue, submitSliderAnswer } from '../../actions/answer';


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


const SliderAnswer = ({value, maxvalue, minvalue, onValueChange, onSubmitPress}) => (
    <View>
        <Text style={styles.sliderrangelabelstyle }>min ---- max</Text>
        <Text style={styles.sliderlabelstyle }>{value}</Text>
        <Slider 
            maximumValue={maxvalue}
            minimumValue={minvalue}
            style={styles.sliderstyle}
            onValueChange={ (value) => this.props.onValueChange(value) }
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
    value: state.question.inferred.slider_values.slider_value,
    maxvalue: state.question.inferred.slider_values.slider_max,
    minvalue: state.question.inferred.slider_values.slider_min,
});

const mapDispatchToProps = dispatch => ({
    updateSliderValue: (value) => dispatch(updateSliderValue(value)),
    onSubmitPress: () => dispatch(submitSliderAnswer())
});


export default connect(mapStateToProps,mapDispatchToProps)(SliderAnswer)
