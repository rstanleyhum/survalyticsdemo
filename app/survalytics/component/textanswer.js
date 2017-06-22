'use strict';

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';

import { submitTextAnswer, changeTextAnswer } from '../actions/answer';

const SUBMITCOLOR = 'yellow';

const styles = StyleSheet.create({
    textinputstyle: {
        margin: 15,
        height: 40,
        borderColor: 'grey',
        borderWidth: 1
    },
    labelstyle: {
        color: 'blue',
    }
});

const TextAnswer = ({ text, onChangeText, onSubmitPress }) => (
    <View>
        <TextInput
            style={styles.textinputstyle }
            placeholder="placeholder"
            onChangeText={ (text) => onChangeText(text) }
            value={text} 
        />
        <Button 
            onPress={onSubmitPress}
            title="Submit"
            color= {SUBMITCOLOR}
        />
    </View>
);


TextAnswer.propTypes = {
    text: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitPress: PropTypes.func.isRequired
}



const mapStateToProps = state => ({
    text: state.survalytic.currentq.question.inferred.text_values.text_answer_text,
});



const mapDispatchToProps = dispatch => ({
    onSubmitPress: () => dispatch(submitTextAnswer()),
    onChangeText: (text) => dispatch(changeTextAnswer(text))
});



export default connect(mapStateToProps,mapDispatchToProps)(TextAnswer)
