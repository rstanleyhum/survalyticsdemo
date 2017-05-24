'use strict';

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import ButtonsAnswer from './buttonsanswer';
import CheckBoxesAnswer from './checkboxesanswer';
import SliderAnswer from './slideranswer';
import TextAnswer from './textanswer';

import { TYPE_BUTTONS, TYPE_TEXT, TYPE_CHECKBOXES, TYPE_SLIDER } from '../../survalytics/question';



const Answer = ({entrytype, buttonstype, texttype, slidertype, checkboxestype}) => {
        switch({entrytype}) {
            case {buttonstype}:
                return <ButtonsAnswer />
            case {texttype}:
                return <TextAnswer />
            case {slidertype}:
                return <SliderAnswer />
            case {checkboxestype}:
                return <CheckboxesAnswer />
        }
        return <View />
};


Answer.propTypes = {
    entrytype: PropTypes.string.isRequired,
    buttonstype: PropTypes.string.isRequired,
    texttype: PropTypes.string.isRequired,
    slidertype: PropTypes.string.isRequired,
    checkboxestype: PropTypes.string.isRequired
};


const mapStateToProps = state => ({
    entrytype: state.question.json_str.questiontype_str,
    buttonstype: TYPE_BUTTONS,
    texttype: TYPE_TEXT,
    slidertype: TYPE_SLIDER,
    checkboxestype: TYPE_CHECKBOXES   
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
