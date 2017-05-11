'use  strict';

import { connect } from 'react-redux';

import MainIndexView from '../components/mainindexview';

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPressDeleteAll: () => {
            console.log("delete all");
        },
        onPressViewQuestions: () => {
            console.log("view questions");
        },
        onPressDownload: () => {
            console.log("download questions");
        },
        onPressUpload: () => {
            console.log("upload reponses");
        }
    }
}

const MainIndex = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainIndexView)

export default MainIndex