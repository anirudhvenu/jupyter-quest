import { combineReducers } from 'redux'

// add reducers
import { firebaseReducer } from 'react-redux-firebase';
import CourseReducer from './course';
const reducers = combineReducers({
  firebase: firebaseReducer,
  CourseReducer

});

export default reducers;