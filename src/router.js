import React from 'react'
import {Switch,Route} from 'react-router-dom'
import App from './components/app'
import Courses from './containers/courses'
import courseDetail from './components/courseDetail'

const Root=()=>(
  <Switch>
    <Route path="/course-detail/:id" component={courseDetail} />
    <Route path="/courses" component={Courses} />
    <Route path="/" component={App} />
  </Switch>
)

export default Root
