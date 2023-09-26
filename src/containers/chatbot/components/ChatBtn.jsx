import React from 'react';
import { MoreHoriz, Textsms } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import propTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

// STYLES
import { chatBtnStyles, chatBtnWrapperStyles, proActiveBoxStyles } from '../utilities/styles';
import { proActiveBoxAnimationProps } from '../utilities/animations';

function ChatBtn({ handleClick, isOpen }) {
  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <Box component={motion.div} sx={proActiveBoxStyles} {...proActiveBoxAnimationProps}>
            Welcome, ask me anything!
          </Box>
        )}
      </AnimatePresence>

      <Box sx={chatBtnWrapperStyles}>
        <IconButton size="large" onClick={handleClick} sx={chatBtnStyles}>
          {isOpen ? (
            <MoreHoriz sx={{ color: 'white', fontSize: '30px' }} />
          ) : (
            <Textsms sx={{ color: 'white', fontSize: '30px' }} />
          )}
        </IconButton>
      </Box>
    </>
  );
}

ChatBtn.propTypes = {
  handleClick: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired,
};

export default ChatBtn;
