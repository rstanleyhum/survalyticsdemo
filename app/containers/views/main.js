'use strict';

import React, { PropTypes } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions } from 'react-navigation';

import { deleteAllQuestions, viewQuestions, uploadResponses, downloadSurvey } from '../../actions/mainindex';

import { GetAllQuestions } from '../../survalytics/localdb';
import { GetAWSReturnData, InsertIntoLocalDB } from '../../survalytics/testing';

const HEADER = '#3b5998'

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


const Main = ({onDeleteAll, onViewQuestions, onDownload, onUpload }) => (
    <View style={styles.container}>
        <Text>{ 'Hello ContentPage' }</Text>
        <TouchableOpacity
            onPress={ async () => { await GetAllQuestions(); } }
            style={styles.button} >
            <Text>{'Select All'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={GetAWSReturnData}
            style={styles.button} >
            <Text>{'GetReturnData'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={InsertIntoLocalDB}
            style={styles.button} >
            <Text>{'InsertIntoLocalDB'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={onDeleteAll}
            style={styles.button} >
            <Text>{'Delete All'}</Text>
        </TouchableOpacity>
        <Button
            title="View Questions"
            onPress={onViewQuestions}
        />
        <Button
            title="Download"
            onPress={onDownload}
        />
        <Button
            title="Upload Click"
            onPress={onUpload}
        />
    </View>    
);


Main.propTypes = {
    onDeleteAll: PropTypes.func.isRequired,
    onViewQuestions: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => ({
    onDeleteAll: () => dispatch(deleteAllQuestions()),
    onViewQuestions: () => dispatch(viewQuestions()),
    onDownload: () => dispatch(downloadSurvey()),
    onUpload: () => dispatch(uploadResponses())
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);