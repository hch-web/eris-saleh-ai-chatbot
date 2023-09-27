import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import propTypes from 'prop-types';

import { chatDialogStyles } from '../utilities/styles';

function CloseChatDialog({ isOpen, handleClose, handleAgree }) {
  return (
    <Dialog sx={chatDialogStyles} disablePortal open={isOpen} onClose={handleClose}>
      <DialogTitle>Are You Sure To End This Chat?</DialogTitle>

      <DialogActions>
        <Button size="small" onClick={handleClose}>
          Cancel
        </Button>

        <Button size="small" onClick={handleAgree}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CloseChatDialog.propTypes = {
  isOpen: propTypes.bool,
  handleClose: propTypes.func.isRequired,
  handleAgree: propTypes.func.isRequired,
};

CloseChatDialog.defaultProps = {
  isOpen: false,
};

export default CloseChatDialog;
