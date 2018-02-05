import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { reactReduxFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
// import reducers
import reducers from './reducers/';

// import middleware
import {firebaseLogger} from './helpers/'

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCaXBvH4LEAO7fP7LNMMol1W8V9J8Fah8A",
  authDomain: "jupyter-dev.firebaseapp.com",
  databaseURL: "https://jupyter-dev.firebaseio.com",
  projectId: "jupyter-dev",
  storageBucket: "jupyter-dev.appspot.com",
  messagingSenderId: "700109501520"
};
firebase.initializeApp(firebaseConfig);
const config = {
  userProfile: 'users',
  enableLogging: false,
  attachAuthIsReady: true,
}

const createStoreWithFirebase = composeWithDevTools(
  reactReduxFirebase(firebase, config),
)(createStore)

const store = createStoreWithFirebase(reducers, applyMiddleware(logger, firebaseLogger))


export default store;