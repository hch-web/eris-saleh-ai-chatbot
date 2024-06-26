import React, { memo } from 'react';
import { Box, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { v4 } from 'uuid';

// COMPONENTS & UTILITIES
import { chatPromptContainerStyles, chatPropmtBoxStyles } from '../utilities/styles';
import { useGlobalContext } from '../context/GlobalContext';

function PromtContainer() {
  const { setFieldValue } = useFormikContext();
  const { suggestions } = useGlobalContext();

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

export default memo(PromtContainer);
