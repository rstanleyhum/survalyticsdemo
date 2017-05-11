'use strict';

import React from 'react';
import { View, Button } from 'react-native';
import CheckBox from 'react-native-checkbox';


class CheckBoxesEntry extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let CheckBoxesArray = this.props.checkboxesinfo.map( (item, idx) => {
            return (
                <View>
                    <CheckBox 
                        labelStyle={this.props.labelstyle} 
                        label={item.name} 
                        checked={item.result}
                        onChange={ (checked) => this.props.onChange(item, checked) }
                    />
                </View>)
        });

        return (
            <View>
                {CheckBoxesArray}        
                <Button 
                    onPress={ () => this.props.onSubmitPress() }
                    title="Submit"
                    color= {this.props.submitcolor }
                />
            </View>
        )
    }
}

export default CheckBoxesEntry