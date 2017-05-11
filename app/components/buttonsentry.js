'use strict';

import React from 'react';
import { View, Button } from 'react-native';


class ButtonsEntry extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let ButtonsArray = this.props.buttonsinfo.map( (item, idx) => {
            return (
                <View>
                    <Button 
                        title={item.name}
                        color={this.props.buttoncolor}
                        onPress={ () => this.props.onPress(item) }
                    />
                </View>)
        });

        return (
            <View>
                {ButtonsArray}        
            </View>
        )
    }
}

export default ButtonsEntry