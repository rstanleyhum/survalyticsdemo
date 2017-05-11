'use strict';

import React from 'react';
import { StyleSheet, View } from 'react-native';

import MainIndex from '../containers/mainindex';


const HEADER = '#3b5998'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: HEADER,
    }
});

const Main = () => (
    <View style={styles.container}>
        <View style={ {height: 25} } />
        <MainIndex />
    </View>
);


export default Main