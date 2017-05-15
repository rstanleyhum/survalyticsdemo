'use strict';

import { connect } from 'react-redux';

import React, { PropTypes } from 'react';
import { View, Button } from 'react-native';

import { submitButtonsAnswer } from '../actions/answer';


const BUTTON_COLOR = 'yellow';


const ButtonsAnswer = ({buttonsinfo, buttoncolor, onPress}) => {
    let ButtonsArray = this.props.buttonsinfo.map( (item, idx) => {
        return (
            <View>
                <Button 
                    title={item.name}
                    color={this.props.buttoncolor}
                    onPress={ () => this.props.onPress(item) }
                />
            </View>)
    });

    return (
        <View>
            {ButtonsArray}        
        </View>
    )
};


ButtonsAnswer.propTypes = {
    buttonsinfo: PropTypes.array.isRequired,
    buttoncolor: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};


const mapStateToProps = state => ({ 
    buttonsinfo: state.question.inferred.button_values.map( (v, k) => {
        return { name: v.button_response_text }
    }),
    buttoncolor: BUTTON_COLOR,
});

const mapDispatchToProps = dispatch => ({
    onPress: (item) => {
        dispatch(submitButtonsAnswer(item));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsAnswer)
