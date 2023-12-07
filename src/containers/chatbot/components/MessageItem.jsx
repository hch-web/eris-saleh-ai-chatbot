import React, { memo, useEffect, useMemo, useState } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import propTypes from 'prop-types';

// COMPONENTS & UTILITIES
import TypingEffect from 'containers/common/TypingEffect';
import { API_URL } from 'utilities/constants';
import {
  chatMessageStyles,
  disableSelection,
  msgFeedbackButtonStyles,
  msgRespButtonStyles,
} from '../utilities/styles';
import useHandleVoicePlayback from '../customHooks/useHandleVoicePlayback';
import { useGlobalContext } from '../context/GlobalContext';

function MessageItem({ query, answer, type, time, isLast, handleRegenerate, isFirst, messageId, audio }) {
  const [isAnimationCompleted, setAnimationCompleted] = useState(!!query);
  const [msgFeedback, setMsgFeedback] = useState(null);
  const [isRegenerating, setRegenerating] = useState(false);
  const isSentByMe = !!query;
  const isAudio = type === 'audio';

  const { setBtnsDisabled, isHumanAgent } = useGlobalContext();
  const { handleStopResponse } = useHandleVoicePlayback(audio, setAnimationCompleted);

  useEffect(() => {
    if (isAnimationCompleted) {
      setBtnsDisabled(false);
    } else {
      setBtnsDisabled(true);
    }
  }, [isAnimationCompleted]);

  const handleMsgFeedback = val => async () => {
    if (msgFeedback === val) return;

    const payload = {
      is_liked: val,
    };

    await fetch(`${API_URL}/message-feedback/${messageId}/`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

          {isAnimationCompleted && !isAudio && (
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

        {!isSentByMe && isAnimationCompleted && !isFirst && !isHumanAgent && (
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

      {!isFirst && !isHumanAgent && (
        <Stack sx={disableSelection} direction="row" gap={2}>
          {!isAnimationCompleted && !isSentByMe && (
            <Button variant="outlined" size="small" sx={msgRespButtonStyles} onClick={handleStopResponse}>
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
      )}
    </>
  );
}

MessageItem.propTypes = {
  type: propTypes.string,
  query: propTypes.string,
  answer: propTypes.string,
  time: propTypes.string,
  isLast: propTypes.bool,
  isFirst: propTypes.bool,
  handleRegenerate: propTypes.func,
  messageId: propTypes.number,
  audio: propTypes.string,
};

MessageItem.defaultProps = {
  type: 'text',
  query: '',
  answer: '',
  time: '',
  isLast: false,
  isFirst: false,
  handleRegenerate: () => {},
  messageId: null,
  audio: null,
};

export default memo(MessageItem);
