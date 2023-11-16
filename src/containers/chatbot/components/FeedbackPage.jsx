import { Box, Button, Divider, Grid, Rating, Stack, TextField, Typography } from '@mui/material';
import React, { memo, useState } from 'react';
import { v4 } from 'uuid';
import { Send } from '@mui/icons-material';
import axios from 'axios';
import propTypes from 'prop-types';

import { API_URL } from 'utilities/constants';
import { feedbackBackBtnStyles, feedbackBoxStyles, feedbackBtnStyles } from '../utilities/styles';
import { feedbackBtnData } from '../utilities/data';

function FeedbackPage({ isMaximized, handleClose, handleBackToChat }) {
  const [selectedBtn, setSelectedBtn] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isOthersOpen, setOthersOpen] = useState(false);

  const handleSelectBtn = label => {
    setSelectedBtn(label);
    setOthersOpen(false);
  };

  const handleChangeRating = (event, newValue) => {
    setRating(newValue);
  };

  const handleSendFeedback = async () => {
    const chatId = localStorage.getItem('chatId');
    const payload = {
      feedback_rating: rating,
      feedback_text: isOthersOpen ? feedbackText : selectedBtn,
    };
    await axios.put(`${API_URL}/feedback/${chatId}/`, payload);
    handleClose();
  };

  const handleSelectOther = () => {
    setSelectedBtn('Others');
    setOthersOpen(true);
  };

  const handleChangeFeedbackText = event => {
    setFeedbackText(event.target.value);
  };

  return (
    <Box sx={feedbackBoxStyles(isMaximized)}>
      <Box p={2} textAlign="center">
        <Typography variant="h6">Are You Sure To End This Chat?</Typography>

        <Typography variant="body1" my={2}>
          Thank You For Chatting With us, If You Can Take A minute and Rate This Chat.
        </Typography>

        <Rating name="Rating" value={rating} onChange={handleChangeRating} defaultValue={0} />
      </Box>

      <Divider flexItem />

      <Box p={2}>
        <Typography variant="h6" mb={2}>
          What did you like?
        </Typography>

        <Grid container columnSpacing={1} rowGap={2} alignItems="center">
          {feedbackBtnData?.map(item => {
            const isSelected = selectedBtn === item?.label;
            const isOthersBtn = item?.label === 'Others';

            return (
              <Grid key={v4()} item xs={12} sm={4} textAlign="center">
                <Button
                  className="Mui-Selected"
                  sx={feedbackBtnStyles(isOthersOpen && isOthersBtn ? true : isSelected)}
                  variant="outlined"
                  onClick={isOthersBtn ? handleSelectOther : () => handleSelectBtn(item?.label)}
                >
                  {item?.label}
                </Button>
              </Grid>
            );
          })}
        </Grid>

        {isOthersOpen && (
          <TextField
            sx={{ paddingTop: 1, '& textarea': { fontSize: 14 } }}
            placeholder="Write something..."
            fullWidth
            multiline
            minRows={1}
            maxRows={2}
            onChange={handleChangeFeedbackText}
            value={feedbackText}
          />
        )}
      </Box>

      <Divider flexItem />

      <Stack p={2} direction="row" alignItems="center" justifyContent="center" spacing={2} flexGrow={1}>
        <Button variant="contained" size="small" sx={feedbackBackBtnStyles} onClick={handleBackToChat}>
          Back to Chat
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: 'capitalize' }}
          startIcon={<Send />}
          onClick={handleSendFeedback}
        >
          Feedback
        </Button>
      </Stack>
    </Box>
  );
}

FeedbackPage.propTypes = {
  isMaximized: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  handleBackToChat: propTypes.func.isRequired,
};

export default memo(FeedbackPage);
