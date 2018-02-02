import React from 'react'

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import {Link} from 'react-router-dom'
import Divider from 'material-ui/Divider'
import { MenuItem } from 'material-ui/Menu'
import StarIcon from 'material-ui-icons/Star'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

 class DrawerMenuItems extends React.Component {
  constructor(props){
    super(props)
    this.state = { open: false };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render(){
    const { classes } = this.props;
    return(
  <div>
    <Divider />
    <List>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <Link className="linkStyle" to="/">Home</Link>
      </ListItem>
      {/* <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <Link className="linkStyle" to="/courses">Courses</Link>
      </ListItem> */}

        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
          <StarIcon />
          </ListItemIcon>
          <Link className="linkStyle" to="/courses">Courses</Link>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
              <StarIcon />
              </ListItemIcon>
              <ListItemText inset primary="Assignment" />
            </ListItem>
          </List>
        </Collapse>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <Link className="linkStyle"  name="Path" to="/path">Path</Link>
      </ListItem>
      
    </List>

    <Divider />
    <List>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
      
    </List>
  </div>
)
  }
}


function btn_logout() {
  console.log("CLICK!")
}

const AppBarMenuItems = ({ onClick, logout }) => (
  <div>
    <MenuItem onClick={() => { onClick(); btn_logout(); }}>My account</MenuItem>
    <MenuItem onClick={() => { logout(); btn_logout(); }}>Logout</MenuItem>
  </div>
)



export const AppBarMenuItemsExport = AppBarMenuItems;

DrawerMenuItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerMenuItems);