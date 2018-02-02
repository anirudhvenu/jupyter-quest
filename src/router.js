import React from 'react'
import {Switch,Route} from 'react-router-dom'
import App from './components/app'
import Courses from './pages/coursePage'
import {courseDetail} from './components/courses/'
import PrivateRoute from './privateRoute';
import Path from './components/path';

const Root=()=>(
  <Switch>
    <PrivateRoute path="/courses/:id" component={courseDetail} />
    <PrivateRoute path="/courses" component={Courses} />
    <PrivateRoute path="/path" component={Path} />
    <Route path="/" component={App} />
  </Switch>
)

export default Root
