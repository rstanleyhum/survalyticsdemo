'use strict';

import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';


class TextEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TextInput
                    style={this.props.textinputstyle }
                    onChangeText={ (text) => this.props.onChangeText(text) }
                    value={ this.props.text } 
                />
                <Text style={this.props.labelstyle}>{this.props.label}</Text>
                <Button 
                    onPress={ () => this.props.onSubmitPress() }
                    title="Submit"
                    color= {this.props.submitcolor }
                />
            </View>
        )
    }
}

export default TextEntry