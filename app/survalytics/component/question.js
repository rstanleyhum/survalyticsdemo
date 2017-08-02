'use strict';

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';

import Answer from './answer';
import { setSkippedSurvey } from '../actions/questions';


const styles = StyleSheet.create({
    p: {
        fontWeight: '300',
        color: 'black',
    },
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        marginLeft: 20,
        marginRight: 20,
        marginTop:10,
        marginBottom:10
    },
    skipbutton: {
        padding: 5,
        marginTop: 5,
        backgroundColor: 'cyan',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inner: {
        flex: 1,
        alignContent: 'center',
        marginTop:15,
        marginBottom:10,
        marginRight:20,
        marginLeft:20,
    }
});

const Question = ({onSkipPressed, htmlcontent}) => (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={onSkipPressed}
            style={styles.skipbutton}
        >
            <Text>Skip Survey</Text>
        </TouchableOpacity>
        <View style={styles.inner}>
            <HTMLView
                value={['<p>', htmlcontent, '</p>'].join('')}
                stylesheet={styles}   
            />
        </View>
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
