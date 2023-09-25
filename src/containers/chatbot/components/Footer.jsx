import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { footerStyles } from '../utilities/styles';

function Footer() {
  return (
    <>
      <Divider sx={{ width: '100%' }} />

      <Box sx={footerStyles}>
        <Typography variant="body2" textAlign="center">
          Powered By Beyond Eris Solutions
        </Typography>
      </Box>
    </>
  );
}

export default Footer;
