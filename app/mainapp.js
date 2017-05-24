'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { addNavigationHelpers } from 'react-navigation';

import { AppNavigator } from './appnav';


const MainApp = ({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

MainApp.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    nav: state.nav
});

export default connect(mapStateToProps)(MainApp);