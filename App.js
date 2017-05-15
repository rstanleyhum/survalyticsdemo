'use strict';

import React from 'react';


import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Main from './app/containers/main';
import AppReducer from './app/reducers/appreducer';
import { SetupLocalDB } from './app/survalytics/localdb';

let store = createStore(
  AppReducer, 
  applyMiddleware(thunk)
);


SetupLocalDB();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

