'use strict';

import React from 'react';
import { View, Text, Slider, Button } from 'react-native';


class SliderEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state.slidervalue = 0;
    }

    render() {
        return (
            <View>
                <Text style={ this.props.sliderrangelabelstyle }>{ this.props.rangelabel }</Text>
                <Text style={ this.props.sliderlabelstyle }>{ this.state.slidervalue }</Text>
                <Slider 
                    maximumValue={ this.props.maxvalue }
                    minimumValue={ this.props.minvalue }
                    style={ this.props.sliderstyle }
                    onSlidingComplete={() => this.props.updateSliderValue(this.value)}
                    onValueChange={ () => this.onValueChange(this.value) }
                />
                <Button 
                    onPress={ () => this.props.onSubmitPress() }
                    title="Submit"
                    color= {this.props.submitcolor }
                />
            </View>
        )
    }

    onValueChange = (value) => {
        this.setState({slidervalue: value })
    }
}

export default SliderEntry