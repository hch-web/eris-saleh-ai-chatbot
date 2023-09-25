import React from 'react';
import { MoreHoriz, Textsms } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import propTypes from 'prop-types';

// STYLES
import { chatBtnStyles, chatBtnWrapperStyles } from '../utilities/styles';

function ChatBtn({ handleClick, isOpen }) {
  return (
    <Box sx={chatBtnWrapperStyles}>
      <IconButton size="large" onClick={handleClick} sx={chatBtnStyles}>
        {isOpen ? (
          <MoreHoriz sx={{ color: 'white', fontSize: '30px' }} />
        ) : (
          <Textsms sx={{ color: 'white', fontSize: '30px' }} />
        )}
      </IconButton>
    </Box>
  );
}

ChatBtn.propTypes = {
  handleClick: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired,
};

export default ChatBtn;
