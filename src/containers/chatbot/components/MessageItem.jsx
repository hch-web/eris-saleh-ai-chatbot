import React, { memo, useState } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import propTypes from 'prop-types';

// COMPONENTS & UTILITIES
import TypingEffect from 'containers/common/TypingEffect';
import { chatMessageStyles, msgRespButtonStyles } from '../utilities/styles';

function MessageItem({ query, answer, type, time, isLast }) {
  const isSentByMe = !!query;
  const isAudio = type === 'audio';
  const [isAnimationCompleted, setAnimationCompleted] = useState(false);

  const handleStopAnimation = () => {
    setAnimationCompleted(true);
  };

  return (
    <>
      <Stack
        sx={{ justifyContent: isSentByMe ? 'flex-end' : 'flex-start' }}
        direction="row"
        alignItems="flex-start"
        width={1}
      >
        <Box sx={chatMessageStyles(isSentByMe, isAudio)}>
          {isAudio && (
            <audio controls src={query}>
              <track kind="captions" />
            </audio>
          )}

          {!isAudio &&
            (query ? (
              <Typography color="white" className="message" variant="body1">
                {query}
              </Typography>
            ) : (
              <TypingEffect
                text={answer}
                stopAnimation={isAnimationCompleted}
                setStopAnimation={setAnimationCompleted}
              />
            ))}

          <Typography variant="subtitle2" fontSize={11} textAlign="end" color={query ? 'white' : 'grey'}>
            {time}
          </Typography>
        </Box>

        {!isSentByMe && isAnimationCompleted && (
          <Stack direction="row" alignItems="center" justifyContent="flex-end" flexGrow={1}>
            <IconButton>
              <ThumbDownOutlined sx={{ fontSize: 14 }} />
            </IconButton>

            <IconButton>
              <ThumbUpOutlined sx={{ fontSize: 14 }} />
            </IconButton>
          </Stack>
        )}
      </Stack>

      <Stack direction="row" gap={2}>
        {!isAnimationCompleted && !isSentByMe && (
          <Button variant="outlined" size="small" sx={msgRespButtonStyles} onClick={handleStopAnimation}>
            Stop Generating
          </Button>
        )}

        {isAnimationCompleted && !isSentByMe && isLast && (
          <Button key={isLast} variant="outlined" size="small" sx={msgRespButtonStyles}>
            Regenerate
          </Button>
        )}
      </Stack>
    </>
  );
}

MessageItem.propTypes = {
  type: propTypes.string,
  query: propTypes.string,
  answer: propTypes.string,
  time: propTypes.string,
  isLast: propTypes.bool,
};

MessageItem.defaultProps = {
  type: 'text',
  query: '',
  answer: '',
  time: '',
  isLast: false,
};

export default memo(MessageItem);
