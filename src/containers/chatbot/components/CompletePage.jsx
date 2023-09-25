import React, { memo } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import propTypes from 'prop-types';

import { completeBoxStyles } from '../utilities/styles';

function CompletePage({ isMaximized }) {
  return (
    <Box sx={completeBoxStyles(isMaximized)}>
      <Typography variant="body1" textAlign="center">
        This Chat Session Has Been Ended!
      </Typography>

      <IconButton
        sx={{
          background: theme => theme.palette.primary.main,
          padding: '20px',

          ':hover': {
            background: theme => theme.palette.primary.main,
          },
        }}
      >
        <ThumbUp sx={{ fontSize: '40px', color: 'white' }} />
      </IconButton>

      <Typography variant="h6" textAlign="center" fontWeight={400}>
        Thank You For Submitting Your Feedback!
      </Typography>
    </Box>
  );
}

CompletePage.propTypes = {
  isMaximized: propTypes.bool,
};

CompletePage.defaultProps = {
  isMaximized: false,
};

export default memo(CompletePage);
