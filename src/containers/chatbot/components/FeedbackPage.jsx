import { Box, Button, Divider, Grid, Rating, Stack, Typography } from '@mui/material';
import React, { memo, useState } from 'react';
import { v4 } from 'uuid';
import { Send } from '@mui/icons-material';
import propTypes from 'prop-types';

import { feedbackBackBtnStyles, feedbackBoxStyles, feedbackBtnStyles } from '../utilities/styles';
import { feedbackBtnData } from '../utilities/data';

function FeedbackPage({ isMaximized, handleClose }) {
  const [selectedBtn, setSelectedBtn] = useState(null);

  const handleSelectBtn = label => {
    setSelectedBtn(label);
  };

  return (
    <Box sx={feedbackBoxStyles(isMaximized)}>
      <Box p={2} textAlign="center">
        <Typography variant="h6">Are You Sure To End This Chat?</Typography>

        <Typography variant="body1" my={2}>
          Thank You For Chatting With us, If You Can Take A minute and Rate This Chat.
        </Typography>

        <Rating name="Rating" defaultValue={0} />
      </Box>

      <Divider />

      <Box p={2}>
        <Typography variant="h6" mb={2}>
          What did you like?
        </Typography>

        <Grid container columnSpacing={1} rowGap={2} alignItems="center">
          {feedbackBtnData?.map(item => {
            const isSelected = selectedBtn === item?.label;

            return (
              <Grid key={v4()} item xs={12} sm={4} textAlign="center">
                <Button
                  className="Mui-Selected"
                  sx={feedbackBtnStyles(isSelected)}
                  variant="outlined"
                  onClick={() => handleSelectBtn(item?.label)}
                >
                  {item?.label}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Divider />

      <Stack p={2} direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <Button variant="contained" size="small" sx={feedbackBackBtnStyles}>
          Back to Chat
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: 'capitalize' }}
          startIcon={<Send />}
          onClick={handleClose}
        >
          Send Your Feedback!
        </Button>
      </Stack>
    </Box>
  );
}

FeedbackPage.propTypes = {
  isMaximized: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
};

export default memo(FeedbackPage);
