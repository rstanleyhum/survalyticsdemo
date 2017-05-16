'use strict';

import React, { PropTypes } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { deleteAllQuestions, viewQuestions, uploadResponses, downloadSurvey } from '../actions/mainindex';

import { GetAllQuestions } from '../survalytics/localdb';
import { GetAWSReturnData, InsertIntoLocalDB } from '../survalytics/testing';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-around',

    }
});


const MainIndex = ({onDeleteAll, onViewQuestions, onDownload, onUpload }) => (
            <View style={styles.container}>
                <Text>Hello ContentPage</Text>
                <Button
                    title="Select All"
                    onPress={ async () => { await GetAllQuestions(); } }
                />
                <Button
                    title="GetReturnData"
                    onPress={GetAWSReturnData}
                />
                <Button
                    title="InsertIntoLocalDB"
                    onPress={InsertIntoLocalDB}
                />
                <Button 
                    title="Delete All"
                    onPress={onDeleteAll}
                />
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


MainIndex.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(MainIndex);