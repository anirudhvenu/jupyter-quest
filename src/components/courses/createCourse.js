import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import { FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';

function getModalStyle() {
  const top = '50';
  const left = '50';

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
    constructor(props){
        super(props)
  this.state = {
    password: '',
    name:''
  };
}

  render() {
    const { classes, openModel, handleClose, handleSubmit, name, password, handleInput } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openModel}
          onClose={()=>handleClose()}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography type="title" id="modal-title">
            <div className={classes.container} >
            <h2>Create Course</h2>

            Name
            <div>
                <TextField type="text"
                    className={classes.textField}
                    name="name" value={name}
                    required='true'
                    onChange={(e) => {handleInput(e)}}/>
                <FormHelperText id="name-error-text">Password Required</FormHelperText>
            </div>
              Password
            <div>
                <TextField type="password"
                    className={classes.textField}
                    name="password" value={password}
                    required='true'
                    onChange={(e) => {handleInput(e)}}/>
                <FormHelperText id="name-error-text">Password Required</FormHelperText>
            </div>
        </div>
            </Typography>
            <Typography type="subheading" id="simple-modal-description">
            <Button raised color="primary" type="submit" onClick={() =>{handleSubmit({ name, password })}} >Submit</Button>
              <Button className="cancelBtn" 
              raised color="default" onClick={ () => {handleClose() }}>Cancel</Button>
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export const CreateCourse = withStyles(styles)(SimpleModal);
