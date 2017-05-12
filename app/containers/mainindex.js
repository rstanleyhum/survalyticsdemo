'use strict';

import { connect } from 'react-redux';

import MainIndexView from '../components/mainindexview';
import { deleteAll, viewQuestions, upload, download } from '../actions/main';

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPressDeleteAll: () => {
            dispatch(deleteAll());
        },
        onPressViewQuestions: () => {
            dispatch(viewQuestions());
        },
        onPressDownload: () => {
            dispatch(download());
        },
        onPressUpload: () => {
            dispatch(upload());
        }
    }
}

const MainIndex = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainIndexView)

export default MainIndex