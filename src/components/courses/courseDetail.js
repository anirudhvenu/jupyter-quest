import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Tabs, { Tab } from 'material-ui/Tabs';

// components
import CreateAssignment from '../createAssignment'
import AppFrame from '../../AppFrame'
import EnhancedTableHead from '../table/enhancedTableHead';
import EnhancedTableToolbar from '../table/enhancedTableToolbar';
import {
  AssignmentList, 
  InstructorView, 
  EditAssignment} from '../assignments/';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Description' }
];

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CourseDetails extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: null,
      page: 0,
      rowsPerPage: 5,
      isAsgmtActive:false,
      open: false,
      vertical: 'top',
      horizontal: 'right',
      message:null,
      value: 0
    };
  }


  closeAssignment=()=>{
    this.setState({isAsgmtActive:false})
  }
  handleNotification = (msg) =>{
    this.setState({ open: true,message:msg });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  submitAssignment=(e)=>{
   let allAssignment={
      name:e.name,
      desc:e.desc
    }
    
    this.props.firebase.push(`assignment/${this.props.match.params.id}`, allAssignment).then( data => {
      // wait for db to send response\

      this.handleNotification('Data Save Successfully');
      this.closeAssignment();
    }) ;
  }

  createAssignment=()=>{
    this.setState({isAsgmtActive:true})
  }

  handleChange = (event, value) => {
    this.setState({ value });
    if(value==0 || value==2){
    this.closeAssignment()
    }
  };

  render() {
    const { classes, assignment, auth, match, firebase } = this.props;
    // get the array of assignments
    let assignments = assignment ? assignment[match.params.id] : [];
    const { order, orderBy, selected, rowsPerPage, page, vertical, horizontal, open, message  } = this.state;

    let activeTab = <h2>No Data</h2>;
    switch (this.state.value) {
      case 0 : {
        activeTab = assignments ? <AssignmentList columnData={columnData}  data={assignments}  /> : <h2>No data</h2>;
        break;
      }
      case 1 : {
        activeTab = <EditAssignment create={this.createAssignment} />
        break;
      }
      case 2: {
        activeTab = <InstructorView />
        break;
      }
      default : {
        break;
      }
    }


    return (
      <div>
        <AppFrame>
          {auth.emailVerified 
          ?
            <Paper className={classes.root}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="ASSIGNMENTS" />
                <Tab label="EDIT" />
                <Tab label="INSTRUCTOR VIEW" />
              </Tabs>
              {activeTab}
            </Paper> 
          :
            '' 
          } 

          { this.state.isAsgmtActive && <CreateAssignment 
          handleClose={this.closeAssignment}
          handleSubmit={this.submitAssignment}
          /> }
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
    );
  }
}

const AssignmentWithFirebase = compose(
  firebaseConnect( (props, store) => [
      {
        path: `assignment/${props.match.params.id}/`,
      }
    ]),
  connect(({ firebase }, props) => ({ auth: firebase.auth, assignment: firebase.ordered.assignment }))
)(CourseDetails)

CourseDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const courseDetail = withStyles(styles)(AssignmentWithFirebase);