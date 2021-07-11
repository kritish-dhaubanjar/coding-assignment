import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';

const ConfirmationDialog = ({ message, handleConfirmation, open }) => {
  return (
    <>
      <Dialog open={open} onClose={() => handleConfirmation(false)}>
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleConfirmation(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmation(true)}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
