'use strict';

import React from 'react';
import { Provider } from 'react-redux';

import store from './app/store';
import MainApp from './app/mainapp';

import { SetupLocalDB } from './app/survalytics/services/localdb';
import { SetupNetInfo } from './app/survalytics/services/network';
import { SetUserGUID } from './app/survalytics/services/response';


SetupLocalDB();
SetupNetInfo();
SetUserGUID();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <MainApp />
      </Provider>
    );
  }
}

