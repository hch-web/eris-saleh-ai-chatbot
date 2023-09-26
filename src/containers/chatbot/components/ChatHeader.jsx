import React, { memo } from 'react';
import { Avatar, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import { CropFree, HighlightOff, SettingsOutlined, WhatsApp } from '@mui/icons-material';
import propTypes from 'prop-types';

import { chatBoxHeaderBtnStyles } from '../utilities/styles';

function ChatHeader({ handleClose, isMaximized, toggleMaximize, toggleSettings }) {
  const isMobileDevice = useMediaQuery('(max-width: 580px)');

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

        <Stack>
          <Typography color="white" variant="body1">
            ERIS AI
          </Typography>

          <Typography color="white" variant="caption">
            {isMobileDevice ? 'Online' : "Lets chat - we're online"}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center">
        <IconButton
          title="Open Whatsapp Chat"
          component="a"
          href="https://wa.me/+971566579439"
          target="_blank"
        >
          <WhatsApp sx={chatBoxHeaderBtnStyles} />
        </IconButton>

        <IconButton title="Settings" onClick={toggleSettings}>
          <SettingsOutlined sx={chatBoxHeaderBtnStyles} />
        </IconButton>

        {!isMobileDevice && (
          <IconButton title={isMaximized ? 'Minimize' : 'Maximize'} onClick={toggleMaximize}>
            <CropFree sx={chatBoxHeaderBtnStyles} />
          </IconButton>
        )}

        <IconButton title="Close" onClick={handleClose}>
          <HighlightOff sx={chatBoxHeaderBtnStyles} />
        </IconButton>
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

export default memo(ChatHeader);
