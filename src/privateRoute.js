import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {compose} from 'redux'


export const PrivateRoute = ({auth, ...rest}) => (
    <div>
        {isLoaded(auth)
            ? !isEmpty(auth)
                ? <Route {...rest} />
                : <Redirect to='/' />
            : 'Loading'
        }
        
    </div>
)

let getAuth = compose(
    firebaseConnect(),
    connect( ({firebase}) => ({ auth: firebase.auth }) )
)(PrivateRoute)

export default getAuth;
