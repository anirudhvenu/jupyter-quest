import React from 'react'
import {Switch,Route} from 'react-router-dom'
import App from './components/app'
import Courses from './pages/coursePage'
import {courseDetail} from './components/courses/'
import PrivateRoute from './privateRoute';

const Root=( {auth} )=>(
  <Switch>
    <PrivateRoute path="/courses/:id" component={courseDetail} />
    <PrivateRoute path="/courses" component={Courses} />
    <Route path="/" component={App} />
  </Switch>
)

export default Root
