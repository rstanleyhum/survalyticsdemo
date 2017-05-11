'use strict';

import React from 'react';

import ButtonsAnswer from '../containers/buttonsanswer';
import CheckBoxesAnswer from '../containers/checkboxesanswer';
import SliderAnswer from '../containers/slideranswer';
import TextAnswer from '../containers/textanswer';


class AnswerEntry extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        switch(this.props.entrytype) {
            case this.props.buttonstype:
                return <ButtonsAnswer />
            case this.props.texttype:
                return <TextAnswer />
            case this.props.slidertype:
                return <SliderAnswer />
            case this.props.checkboxestype:
                return <CheckboxesAnswer />
        }
        return <View />
    }
}

export default AnswerEntry