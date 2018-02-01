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
import CoursesDetail from '../components/courseDetail'
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Card, { CardActions, CardContent } from 'material-ui/Card';
  /**
   * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
   */

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
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
  card: {
    minWidth: 275,
  },
  superCard:{
    width:'200px',
    marginLeft:'auto',
    marginRight:'auto'
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
        vertical: 'top',
        horizontal: 'right',
        message:null,
        value: 0
        }
        this.handleInput=this.handleInput.bind(this)
    }

    handleChange = (event, value) => {
      this.setState({ value });
    };

    handleNotification = (msg) => {
      this.setState({ open: true,message:msg });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    handleInput(e){
      this.setState({[e.target.name]:e.target.value})
    }
    createCourse=()=>{
      this.setState({courseActive:true})
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
        pass:formData.password,
        uid:this.props.auth.uid
      }
      // push data to <firebase></firebase>
      this.props.firebase.push('courses', allCourses).then( data => {
        // wait for db to send response\

        this.handleNotification('Data Save Successfully');
        this.cancelSubmit();
      }) ;
      
    }
    render(){
      const {classes, courses, auth, firebase }  = this.props;
      const { vertical, horizontal, open, message } = this.state;
    return(
    <div>
      <AppFrame>
      { !auth.emailVerified && <div  className={classes.superCard}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>Restricted Content</Typography>
          <Typography type="headline" component="h2">
           Please Log In
          </Typography>
        </CardContent>
      </Card>
    </div> }
       {auth.emailVerified && <Button raised onClick={this.createCourse}>
          Create a Course
      </Button>}
      {courses ? 
      !this.state.courseActive ? <CourseTable courses={courses} auth={auth}/> : ''
      : 
        <div className={classes.root}>
        { auth.emailVerified && <div>
        <AppBar position="static" className="marginTop">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="My Course" />
            <Tab label="Joined Course" />
            <Tab label="Public Course" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 &&   <h2>Course Not Found</h2> }
        {this.state.value === 1 &&   <h2>Course Not Found</h2> }
        {this.state.value === 2 &&   <h2>Course Not Found</h2> }
        </div>}
      </div>
    }
        

       { this.state.courseActive && (<div>
         <CreateCourse isCourseActive={this.state.courseActive} 
         handleSubmit={this.submitCourse.bind(this)} 
         handleCancel={this.cancelSubmit.bind(this)} 
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
  firebaseConnect( (props, store) => {
    return [
    {
      path:`courses`, 
      storeAs:'myCourses', 
      queryParams:  [ 'orderByChild=uid', `equalTo=${store.getState().firebase.auth.uid}` ]
    }
  ]
  }),
  connect(({ firebase }) => ({ auth: firebase.auth, courses: firebase.ordered['myCourses'] }))
)(Courses)

 Courses.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CoursesWithFirebase)