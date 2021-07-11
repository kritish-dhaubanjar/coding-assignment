import React from 'react';
import { useContext } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import ToastContext from '../../context/toast';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertSnakbar = () => {
  const classes = useStyles();
  const toastContext = useContext(ToastContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    toastContext.setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={toastContext.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity={toastContext.toast.severity} onClose={handleClose}>
          {toastContext.toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertSnakbar;
