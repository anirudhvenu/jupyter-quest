import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'

import Courses from '../containers/courses';
  /**
   * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
   */
const CoursePage = ({auth}) => (
  <div>
    {isLoaded(auth)
      ? <Courses />
      : 'Loading'
    }
  </div>
)

const CoursesWithFirebase = compose(
  firebaseConnect(),
  connect(({ firebase }) => ({ auth: firebase.auth}))
)(CoursePage)


export default CoursesWithFirebase