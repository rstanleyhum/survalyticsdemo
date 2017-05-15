'use strict';

import { connect } from 'react-redux';
import { PropTypes } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';

import { submitTextAnswer, changeTextAnswer } from '../actions/answer';

const SUBMITCOLOR = 'yellow';

const styles = StyleSheet.create({
    textinputstyle: {
        color: 'red',
    },
    labelstyle: {
        color: 'blue',
    }
});

const TextAnswer = ({ text, label, onChangeText, onSubmitPress }) => (
    <View>
        <TextInput
            style={styles.textinputstyle }
            onChangeText={ (text) => this.props.onChangeText(text) }
            value={text} 
        />
        <Text style={styles.labelstyle}>{label}</Text>
        <Button 
            onPress={onSubmitPress}
            title="Submit"
            color= {SUBMITCOLOR}
        />
    </View>
);


TextAnswer.propTypes = {
    text: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitPress: PropTypes.func.isRequired
}



const mapStateToProps = state => ({
    text: state.question.inferred.text_values.text_answer_text,
    label: state.question.inferred.text_values.text_response_text,
});



const mapDispatchToProps = dispatch => ({
    onSubmitPress: () => dispatch(submitTextAnswer()),
    onChangeText: (text) => dispatch(changeTextAnswer(text))
});



export default connect(mapStateToProps,mapDispatchToProps)(TextAnswer)
