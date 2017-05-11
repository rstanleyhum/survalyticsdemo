'use strict';

import React, { PropTypes } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default class MainIndexView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello ContentPage</Text>
                <Button 
                    title="Delete All"
                    onPress={() => {this.props.onPressDeleteAll();}}
                />
                <Button
                    title="View Questions"
                    onPress={() => {this.props.onPressViewQuestions();}}
                />
                <Button
                    title="Download"
                    onPress={() => {this.props.onPressDownload();}}
                />
                <Button
                    title="Upload Click"
                    onPress={() => {this.props.onPressUpload();}}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-around',

    }
});