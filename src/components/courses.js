import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

// components
import MyCourses from '../components/myCourses';
import JoinedCourses from '../components/joinedCourses';
import PublicCourses from '../components/publicCourses';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Course name' },
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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

// Courses Table 

class CoursesContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'name',
      selected: [],
      page: 0,
      rowsPerPage: 5,
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, courses, auth } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const bull = <span className={classes.bullet}>•</span>;

    let activeTab = <h2>No data</h2>;
    switch (this.state.value) {
      case 0 : {
        activeTab = courses ? <MyCourses columnData={columnData}  data={courses}  /> : <h2>No data</h2>;
        break;
      }
      case 1 : {
        activeTab = <JoinedCourses />
        break;
      }
      case 2: {
        activeTab = <PublicCourses />
        break;
      }
      default : {
        break;
      }
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="My Course" />
            <Tab label="Joined Course" />
            <Tab label="Public Course" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        {activeTab}
      </div>
  );
}
}

CoursesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CoursesContainer);
