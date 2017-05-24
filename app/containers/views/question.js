'use strict';

import { connect } from 'react-redux';
import { PropTypes } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import HTMLView from 'react-native-htmlview';

import Answer from '../component/answer';
import { skipQuestion } from '../../actions/answer';


const SKIPBUTTONCOLOR = 'red';

const styles = StyleSheet.create({
    p: {
        color: 'red',
    }
});

const Question = ({onSkipPressed, htmlcontent}) => (
    <View>
        <Button 
            onPress={onSkipPressed}
            title="Skip"
            color= {SKIPBUTTONCOLOR}
        />
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
    htmlcontent: state.question.json_str.questionprompt_str
});


const mapDispatchToProps = dispatch => ({
    onSkipPressed: () => dispatch(skipQuestion())
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
