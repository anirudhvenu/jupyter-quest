import React from 'react'
import {Switch,Route} from 'react-router-dom'
import App from './components/app'
import Courses from './pages/coursePage'
import {courseDetail} from './components/courses/'
import Path from './components/path'

const Root=()=>(
  <Switch>
    <Route path="/courses/:id" component={courseDetail} />
    <Route path="/courses" component={Courses} />
    <Route path="/" component={App} />
  </Switch>
)

export default Root
