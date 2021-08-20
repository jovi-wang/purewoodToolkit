import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import ContainerScreen from './ContainerScreen';
import {commonReducer, containerReducer} from './reducers';

const reducers = combineReducers({
  common: commonReducer,
  container: containerReducer,
});
let store;
if (__DEV__) {
  store = createStore(reducers, {}, applyMiddleware(thunk, logger));
} else {
  store = createStore(reducers, {}, applyMiddleware(thunk));
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ContainerScreen />
      </Provider>
    );
  }
}
