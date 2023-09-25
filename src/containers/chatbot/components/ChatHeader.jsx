import React from 'react';
import { Avatar, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { CropFree, HighlightOff, SettingsOutlined, WhatsApp } from '@mui/icons-material';
import propTypes from 'prop-types';

import { chatBoxHeaderBtnStyles } from '../utilities/styles';

function ChatHeader({ handleClose, isMaximized, toggleMaximize, toggleSettings }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ background: theme => theme.palette.primary.main }}
      padding={1}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar src="https://besportal.s3.amazonaws.com/media/invoice_docs/logo-280px.jpg" alt="Eris" />

        <Typography color="white" variant="body1">
          Eris AI
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center">
        <Tooltip title="Open Whatsapp Chat">
          <IconButton component="a" href="https://wa.me/+971506960126" target="_blank">
            <WhatsApp sx={chatBoxHeaderBtnStyles} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Settings" onClick={toggleSettings}>
          <IconButton>
            <SettingsOutlined sx={chatBoxHeaderBtnStyles} />
          </IconButton>
        </Tooltip>

        <Tooltip title={isMaximized ? 'Minimize' : 'Maximize'}>
          <IconButton onClick={toggleMaximize}>
            <CropFree sx={chatBoxHeaderBtnStyles} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Close">
          <IconButton onClick={handleClose}>
            <HighlightOff sx={chatBoxHeaderBtnStyles} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

ChatHeader.propTypes = {
  handleClose: propTypes.func.isRequired,
  isMaximized: propTypes.bool.isRequired,
  toggleMaximize: propTypes.func.isRequired,
  toggleSettings: propTypes.func.isRequired,
};

export default ChatHeader;
