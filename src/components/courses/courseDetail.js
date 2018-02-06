import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

// components
import CreateAssignment from '../createAssignment'
import Notification from '../notification'
import AppFrame from '../../AppFrame'
import {
  AssignmentList, 
  InstructorView, 
  EditAssignment} from '../assignments/';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Description' }
];

const columnDataForEditAssignment = [
  { id: 'Name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'Avisible', numeric: true, disablePadding: false, label: 'Assignment Visible' },
  { id: 'Sovisible', numeric: true, disablePadding: false, label: 'Solution Visible' },
  { id: 'AopenDt', numeric: true, disablePadding: false, label: 'Assignment Open Date' },
  { id: 'AoTime', numeric: true, disablePadding: false, label: 'Assignment Open Time' },
  { id: 'AcloseDt', numeric: true, disablePadding: false, label: 'Assignment Close Date' },
  { id: 'AcTime', numeric: true, disablePadding: false, label: 'Assignment Close Time' },
  { id: 'Detail', numeric: true, disablePadding: false, label: 'Details' },
  { id: 'Order', numeric: true, disablePadding: false, label: 'Order' }
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
      showTable:true,
      open: false,
      message:null,
      value: 0
    };
  }

  closeAssignment=()=>{
    this.setState({isAsgmtActive:false, showTable:true})
  }
  handleNotification = (msg) =>{
    this.setState({ open: true,message:msg });
  };
  closeNotification = () => {
    this.setState({ open: false });
  };
  submitAssignment=(e)=>{
   let allAssignment={
      name:e.name,
      desc:e.desc,
      text:e.text,
      path:e.path
    }
    this.props.firebase.push(`assignment/${this.props.match.params.id}`, allAssignment).then( data => {
      // wait for db to send response\

      this.handleNotification('Assignment Added Successfully');
      this.closeAssignment();
      this.setState({showTable:true})
    }) ;
  }

  createAssignment=()=>{
    this.setState({isAsgmtActive:true, showTable:false})
  }

  handleChange = (event, value) => {
    this.setState({ value });
    if(value===0 || value===2){
    this.closeAssignment()
    }
  };

  render() {
    const { classes, assignment, auth, match } = this.props;
    // get the array of assignments
    let assignments = assignment ? assignment[match.params.id] : [];
    const { open, message, showTable  } = this.state;

    let activeTab = <h2>No Data</h2>;
    switch (this.state.value) {
      case 0 : {
        activeTab = assignments ? <AssignmentList  firebase={this.props.firebase} columnData={columnData} uid={match.params.id}  data={assignments}  /> : <h2>No data</h2>;
        break;
      }
      case 1 : {
        activeTab =   <EditAssignment firebase={this.props.firebase} uid={match.params.id} create={this.createAssignment} columnData={columnDataForEditAssignment}  
        data={assignments} showTable={showTable}/>
   
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
        <AppFrame pageTitle="Assignments" >
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
     
        <Notification message={message} open={open} handleClose={this.closeNotification}/>
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
  assignment: PropTypes.object,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
};

export const courseDetail = withStyles(styles)(AssignmentWithFirebase);