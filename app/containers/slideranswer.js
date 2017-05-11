'user strict';

import { connect } from 'react-redux';

import SliderEntry from '../components/sliderentry';

const mapStateToProps = (state) => {
    return {
        sliderrangelabelstyle: STYLE,
        sliderlabelstyle: STYLE,
        rangelabel: state.question.inferred.slider_values,
        sliderlabel: BUTTON_COLOR,
        sliderstyle: STYLE,
        labelstyle: LABEL_STYLE,
        submitcolor: color,
        maxvalue: max_value,
        minvalue: min_value,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSliderValue: (value) => {

        },
        onSubmitPress: () => {

        }
    }
}

const SliderAnswer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SliderEntry)

export default SliderAnswer
