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
    <Link className="linkStyle" to="/">
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      </Link>
       <Link className="linkStyle" to="/courses">
        <ListItem button>
          <ListItemIcon>
          <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
        </Link>
        <ListItem button>
        <ListItemIcon>
        <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Paths" />
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