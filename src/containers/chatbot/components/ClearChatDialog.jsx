import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import propTypes from 'prop-types';

import { chatDialogStyles } from '../utilities/styles';

function ClearChatDialog({ isOpen, handleClose, handleAgree }) {
  return (
    <Dialog sx={chatDialogStyles} disablePortal open={isOpen} onClose={handleClose}>
      <DialogTitle fontSize={14}>Are You Sure to Clear?</DialogTitle>

      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button size="small" sx={{ fontSize: '12px' }} onClick={handleClose}>
          Cancel
        </Button>

        <Button size="small" sx={{ fontSize: '12px' }} onClick={handleAgree}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ClearChatDialog.propTypes = {
  isOpen: propTypes.bool,
  handleClose: propTypes.func.isRequired,
  handleAgree: propTypes.func.isRequired,
};

ClearChatDialog.defaultProps = {
  isOpen: false,
};

export default ClearChatDialog;
