'use strict';

import { connect } from 'react-redux';

import React, { PropTypes } from 'react';
import { View, Button } from 'react-native';

import { submitButtonsAnswer } from '../actions/answer';


const BUTTON_COLOR = 'yellow';


const ButtonsAnswer = ({buttonsinfo, buttoncolor, onPress}) => {
    return (
        <View>
            {buttonsinfo.map( (item) => 
                <Button
                    title={item.name}
                    color={buttoncolor}
                    key={item.name}
                    onPress={ () => onPress(item) }
                />
            )}
        </View>
    )
};


ButtonsAnswer.propTypes = {
    buttonsinfo: PropTypes.array.isRequired,
    buttoncolor: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};


const mapStateToProps = state => ({ 
    buttonsinfo: state.survalytic.currentq.question.inferred.button_values.map( (v, k) => {
        return {
            name: v.button_response_text
        }
    }),
    buttoncolor: BUTTON_COLOR,
});

const mapDispatchToProps = dispatch => ({
    onPress: (item) => {
        dispatch(submitButtonsAnswer(item));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsAnswer)
