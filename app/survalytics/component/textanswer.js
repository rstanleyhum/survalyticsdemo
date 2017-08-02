'use strict';

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

import { submitTextAnswer, changeTextAnswer } from '../actions/answer';

const SUBMITCOLOR = 'grey';

const styles = StyleSheet.create({
    textinputstyle: {
        margin: 5,
        height: 40,
        borderColor: 'grey',
        borderWidth: 1
    },
    button: {
        padding: 5,
        marginTop: 5,
        backgroundColor: 'cyan',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const TextAnswer = ({ text, onChangeText, onSubmitPress }) => (
    <View>
        <TextInput
            style={styles.textinputstyle}
            placeholder="placeholder"
            onChangeText={ (text) => onChangeText(text) }
            value={text} 
        />
        <TouchableOpacity 
            onPress={onSubmitPress}
            style={styles.button}
        >
            <Text>Submit</Text>
        </TouchableOpacity>
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
