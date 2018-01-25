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
import Typography from 'material-ui/Typography';
import AppFrame from '../AppFrame'
import CourseTable from '../components/courses';
import CreateCourse from '../components/createCourse';
import Paper from 'material-ui/Paper/Paper';
import Snackbar from 'material-ui/Snackbar';
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

 class Courses extends React.Component{
    constructor(prop){
      super(prop)
      this.state={
        courseActive:false,
        password:'',
        name:'',
        desc:'',
        open: false,
        vertical: null,
        horizontal: null,
        message:null
        }
        this.handleInput=this.handleInput.bind(this)
    }

    handleClick = state => (msg) => {
      console.log("called....")
      this.setState({ open: true, vertical: 'top', horizontal: 'right',message:msg });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    handleInput(e){
      this.setState({[e.target.name]:e.target.value})
    }
    createCourse=()=>{
      this.setState({courseActive:true})
      this.handleClick({vertical: 'top', horizontal: 'right' })
    }
    cancelSubmit=()=>{
      
      this.setState({
        name: '',
        desc: '',
        password: '',
        courseActive:false})
    }
    submitCourse=(formData)=>{
      let allCourses={
        title:formData.name,
        desc:formData.desc,
        pass:formData.password
      }
      // push data to <firebase></firebase>
      this.props.firebase.push('courses', allCourses).then( data => {
        // wait for db to send response
        this.cancelSubmit();
      } );
      
    }
    render(){
      const {classes, courses, firebase}  = this.props;
      const { vertical, horizontal, open, message } = this.state;
    return(
    <div>
      <AppFrame>
        <Button raised onClick={this.createCourse}>
          Create a Course
      </Button>
      {courses ? 
      !this.state.courseActive ? <CourseTable courses={courses} /> : ''
      : <Paper  className={classes.root}>
        <div className={classes.title}>
        <Typography type="title">No Data</Typography>
      </div>
      </Paper>
    }
        

       { this.state.courseActive && (<div>
         <CreateCourse isCourseActive={this.state.courseActive} 
         handleSubmit={this.submitCourse.bind(this)} 
         handleCancel={this.cancelSubmit.bind(this)} 
         notification={this.handleClick({vertical: 'top', horizontal: 'right' })}
         />
          </div>) }
      </AppFrame>

      <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
    </div>
  )
}
}

const CoursesWithFirebase = compose(
    firebaseConnect(['courses']),
    connect(({ firebase }) => ({ auth: firebase.auth, courses: firebase.ordered.courses }))
)(Courses)

 Courses.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CoursesWithFirebase)