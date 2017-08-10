'use strict';

import React, { PropTypes } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions } from 'react-navigation';

import { deleteAllQuestions, viewQuestions, uploadResponses, downloadSurvey, resetSkipSurvey } from '../../survalytics/actions/survey';

import { GetAllQuestions, GetResponsesToUpload } from '../../survalytics/services/localdb';

import { GetAWSReturnData, InsertIntoLocalDB } from '../../services/testing';

import Survey from '../../survalytics/component/survey';



const HEADER = '#3b5998'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        marginTop:20,
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


const Main = ({onDeleteAll, onViewQuestions, onDownload, onUpload, resetSkip }) => (
    <ScrollView>
        <View style={styles.container}>
            <Text>{ 'Survalytics Demo App' }</Text>

            <Survey />

            <TouchableOpacity
                onPress={ async () => { console.log(JSON.stringify(await GetAllQuestions(), null, 2)); } }
                style={styles.button} >
                <Text>{'Show All LocalDB Questions'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={ async () => { console.log(JSON.stringify(await GetResponsesToUpload(), null, 2)); } }
                style={styles.button} >
                <Text>{'Show All LocalDB Responses'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={InsertIntoLocalDB}
                style={styles.button} >
                <Text>{'Insert From Local File Into LocalDB'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onDeleteAll}
                style={styles.button} >
                <Text>{'Delete All'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={onViewQuestions}
                style={styles.button} >
                <Text>{'View Questions'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={ resetSkip }
                style={styles.button} >
                <Text>{'Reset Skipped Survey Flag'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onDownload}
                style={styles.button} >
                <Text>{'Download From AWS'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={onUpload}
                style={styles.button} >
                <Text>{'Upload TO AWS'}</Text>
            </TouchableOpacity>

        </View>
    </ScrollView>
);


Main.propTypes = {
    onDeleteAll: PropTypes.func.isRequired,
    onViewQuestions: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
    resetSkip: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => ({
    onDeleteAll: () => dispatch(deleteAllQuestions()),
    onViewQuestions: () => dispatch(viewQuestions()),
    onDownload: () => dispatch(downloadSurvey()),
    onUpload: () => dispatch(uploadResponses()),
    resetSkip: () => dispatch(resetSkipSurvey())
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);
