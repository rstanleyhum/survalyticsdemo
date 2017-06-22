'use strict';

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';

import Answer from './answer';
import { setSkippedSurvey } from '../actions/questions';


const SKIPBUTTONCOLOR = 'red';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    button: {
        padding:20,
        borderRadius:20,
        backgroundColor: 'blue',
        marginTop:20,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

const Question = ({onSkipPressed, htmlcontent}) => (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={onSkipPressed}
            style={styles.button}
            color={SKIPBUTTONCOLOR}
            >
            <Text>{'Skip Survey'}</Text>
        </TouchableOpacity>
        <HTMLView
            value={htmlcontent}
            stylesheet={styles}
        />
        <Answer />
    </View>
);


Question.propTypes = {
    onSkipPressed: PropTypes.func.isRequired,
    htmlcontent: PropTypes.string.isRequired
}


const mapStateToProps = state => ({
    htmlcontent: state.survalytic.currentq.question.json_str.questionprompt_str
});


const mapDispatchToProps = dispatch => ({
    onSkipPressed: () => dispatch(setSkippedSurvey(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
