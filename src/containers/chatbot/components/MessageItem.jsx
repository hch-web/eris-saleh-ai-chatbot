import React, { memo, useMemo, useState } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import propTypes from 'prop-types';

// COMPONENTS & UTILITIES
import TypingEffect from 'containers/common/TypingEffect';
import {
  chatMessageStyles,
  disableSelection,
  msgFeedbackButtonStyles,
  msgRespButtonStyles,
} from '../utilities/styles';

function MessageItem({ query, answer, type, time, isLast, handleRegenerate }) {
  const [isAnimationCompleted, setAnimationCompleted] = useState(!!query);
  const [msgFeedback, setMsgFeedback] = useState(null);
  const [isRegenerating, setRegenerating] = useState(false);
  const isSentByMe = !!query;
  const isAudio = type === 'audio';

  const handleStopAnimation = () => {
    setAnimationCompleted(true);
  };

  const handleMsgFeedback = val => () => {
    setMsgFeedback(val);
  };

  const handleRegenerating = () => {
    setRegenerating(true);
    handleRegenerate();
  };

  const isRespGood = useMemo(() => msgFeedback === true, [msgFeedback]);
  const isRespBad = useMemo(() => msgFeedback === false, [msgFeedback]);

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

          {isAnimationCompleted && (
            <Typography
              variant="subtitle2"
              fontSize={11}
              textAlign="end"
              color={query ? 'white' : 'grey'}
              sx={disableSelection}
            >
              {time}
            </Typography>
          )}
        </Box>

        {!isSentByMe && isAnimationCompleted && (
          <Stack direction="row" alignItems="center" justifyContent="flex-end" flexGrow={1}>
            <IconButton
              sx={{ color: isRespBad ? 'primary.main' : 'currentcolor' }}
              onClick={handleMsgFeedback(false)}
            >
              {isRespBad ? (
                <ThumbDown sx={msgFeedbackButtonStyles} />
              ) : (
                <ThumbDownOutlined sx={msgFeedbackButtonStyles} />
              )}
            </IconButton>

            <IconButton
              sx={{ color: isRespGood ? 'primary.main' : 'currentcolor' }}
              onClick={handleMsgFeedback(true)}
            >
              {isRespGood ? (
                <ThumbUp sx={msgFeedbackButtonStyles} />
              ) : (
                <ThumbUpOutlined sx={msgFeedbackButtonStyles} />
              )}
            </IconButton>
          </Stack>
        )}
      </Stack>

      <Stack sx={disableSelection} direction="row" gap={2}>
        {!isAnimationCompleted && !isSentByMe && (
          <Button variant="outlined" size="small" sx={msgRespButtonStyles} onClick={handleStopAnimation}>
            Stop Generating
          </Button>
        )}

        {isAnimationCompleted && !isSentByMe && isLast && (
          <Button
            key={isLast}
            variant="outlined"
            size="small"
            sx={msgRespButtonStyles}
            onClick={handleRegenerating}
            disabled={isRegenerating}
          >
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
  handleRegenerate: propTypes.func,
};

MessageItem.defaultProps = {
  type: 'text',
  query: '',
  answer: '',
  time: '',
  isLast: false,
  handleRegenerate: () => {},
};

export default memo(MessageItem);
