import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, pathToJS } from 'react-redux-firebase'
import PropTypes from 'prop-types'

import Courses from '../containers/courses';
  /**
   * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
   */


 class CoursePage extends React.Component{
    constructor(prop){
      super(prop)
    }

    render(){
      const {classes, courses, auth, firebase }  = this.props;
    return(
        <div>
            {isLoaded(auth)
            ? <Courses />
            : 'Loading'
             }
        
        </div>
  )
}
}

const CoursesWithFirebase = compose(
  firebaseConnect(),
  connect(({ firebase }) => ({ auth: firebase.auth}))
)(CoursePage)


export default CoursesWithFirebase