'use strict';

import React from 'react';
import { View, Button } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Answer from '../containers/answer';

class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Button 
                    onPress={ () => this.props.onSkipPressed() }
                    title="Skip"
                    color= {this.props.skipcolor }
                />
                <HTMLView
                    value={this.props.htmlcontent}
                    stylesheet={this.props.stylesheet}
                />
                <Answer />                
            </View>
        )
    }
}

export default QuestionPage 