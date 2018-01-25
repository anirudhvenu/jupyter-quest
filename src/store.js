import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import { reactReduxFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
// import reducers
import reducers from './reducers/';

// import middleware
import {firebaseLogger} from './helpers/'

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDFhwVmkAD_Uq-abtHserMz4mOHuR7M6cc",
  authDomain: "react-firebase-19d1f.firebaseapp.com",
  databaseURL: "https://react-firebase-19d1f.firebaseio.com",
  projectId: "react-firebase-19d1f",
  storageBucket: "react-firebase-19d1f.appspot.com",
  messagingSenderId: "911112473910"
};
firebase.initializeApp(firebaseConfig);
const config = {
  userProfile: 'users',
  enableLogging: false,
  attachAuthIsReady: true,
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config),
)(createStore)

const store = createStoreWithFirebase(reducers, applyMiddleware(logger, firebaseLogger))


export default store;