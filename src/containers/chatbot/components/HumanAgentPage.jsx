import React, { memo, useEffect, useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import propTypes from 'prop-types';

import { humanAgentBoxStyles } from '../utilities/styles';
import { getFormattedNumber } from '../utilities/helpers';

function HumanAgentPage({ isMaximized, handleCancel }) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setElapsedTime(prevState => prevState + 1);
    }, [1000]);

    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  const hours = useMemo(() => Math.floor(elapsedTime / 3600), [elapsedTime]);
  const minutes = useMemo(() => Math.floor((elapsedTime % 3600) / 60), [elapsedTime]);
  const seconds = useMemo(() => Math.floor((elapsedTime % 3600) % 60), [elapsedTime]);

  return (
    <Box sx={humanAgentBoxStyles(isMaximized)}>
      <Person color="primary" sx={{ fontSize: 90 }} />

      <Typography variant="body1">Please wait while our agent is connecting...</Typography>

      <Typography variant="h6">
        {`${getFormattedNumber(hours)} : ${getFormattedNumber(minutes)} : ${getFormattedNumber(seconds)}`}
      </Typography>

      <Button variant="contained" size="small" onClick={handleCancel}>
        Cancel
      </Button>
    </Box>
  );
}

HumanAgentPage.propTypes = {
  handleCancel: propTypes.func.isRequired,
  isMaximized: propTypes.bool,
};

HumanAgentPage.defaultProps = {
  isMaximized: false,
};

export default memo(HumanAgentPage);
