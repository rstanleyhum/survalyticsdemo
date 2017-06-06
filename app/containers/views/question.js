'use strict';

import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';

import Answer from '../component/answer';
import { skipQuestion } from '../../actions/answer';


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
            <Text>{'Skip'}</Text>
        </TouchableOpacity>
        <HTMLView
            value={htmlcontent}
            stylesheet={styles}
        />
        
    </View>

);


Question.propTypes = {
    onSkipPressed: PropTypes.func.isRequired,
    htmlcontent: PropTypes.string.isRequired
}


const mapStateToProps = state => ({
    //htmlcontent: state.question.json_str.questionprompt_str
    htmlcontent: '<b>Hello htmlcontent</b>'
});


const mapDispatchToProps = dispatch => ({
    onSkipPressed: () => dispatch(skipQuestion())
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
