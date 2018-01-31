
import React from 'react'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
  /**
   * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
   */

const styles = theme => ({
  container: {
    display: 'inline-block',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  menu: {
    width: 200,
  },
});

 class createCourse extends React.Component{
    constructor(prop){
      super(prop)
      this.state={
        name:'',
        desc:'',
        password:'',
        courseActive:false,
        }
        this.handleInput=this.handleInput.bind(this)
    }

    handleInput(e){
      this.setState({[e.target.name]:e.target.value});
    }
    render(){
      const {classes, isCourseActive, handleCancel, handleSubmit }  = this.props;
      const { name, desc, password } = this.state;
    return(
        <div className={classes.container} >
            <h2>CREATE COURSE</h2>
            <br /><br />
            Enter Name
            <div>
              <TextField 
                  className={classes.textField}
               name="name" value={this.state.name}
                onChange={this.handleInput}/><br />
                <FormHelperText id="name-error-text">Name Required</FormHelperText>
            </div>
              Description
            <div>
              <TextField
                  className={classes.textField}
               name="desc" value={this.state.desc}
              onChange={this.handleInput}/>
              <FormHelperText id="name-error-text">Description Required</FormHelperText>
            </div>
              Password
            <div>
                <TextField type="password"
                    className={classes.textField}
                    name="password" value={this.state.password}
                    onChange={this.handleInput}/>
                <FormHelperText id="name-error-text">Password Required</FormHelperText>
            </div>
            <div>
              <Button raised color="primary" type="submit" onClick={() =>{handleSubmit({ name, desc, password })}} >Submit</Button>
              <Button className="cancelBtn" 
              raised color="default" onClick={ () => {handleCancel() }}>Cancel</Button>
            </div>
        </div>
  )
}
}

const CoursesWithFirebase = compose(
  firebaseConnect(),
  connect()
)(createCourse)

createCourse.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CoursesWithFirebase)