'use strict';

import React from 'react';


import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Main from './app/components/main';
import AppReducer from './app/reducers/appreducer';

let store = createStore(AppReducer);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

