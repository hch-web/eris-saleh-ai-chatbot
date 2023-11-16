import React, { memo } from 'react';
import { Box, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { v4 } from 'uuid';
import propTypes from 'prop-types';

// COMPONENTS & UTILITIES
import { chatPromptContainerStyles, chatPropmtBoxStyles } from '../utilities/styles';

function PromtContainer({ suggestions }) {
  const { setFieldValue } = useFormikContext();

  const handleClick = prompt => {
    setFieldValue('message', prompt);
  };

  return (
    <Box sx={chatPromptContainerStyles}>
      <Stack width={1} direction="row" alignItems="center" gap={1}>
        {suggestions?.map(prompt => (
          <Box key={v4()} onClick={() => handleClick(prompt)} sx={chatPropmtBoxStyles}>
            {prompt}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

PromtContainer.propTypes = {
  suggestions: propTypes.arrayOf(propTypes.string),
};

PromtContainer.defaultProps = {
  suggestions: [],
};

export default memo(PromtContainer);
