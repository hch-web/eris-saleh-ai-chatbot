import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import propTypes from 'prop-types';

// COMPONENTS & UTILITIES
import TypingEffect from 'containers/common/TypingEffect';
import { chatMessageStyles } from '../utilities/styles';

function MessageItem({ query, answer, type, time }) {
  const isSentByMe = !!query;
  const isAudio = type === 'audio';

  return (
    <Box sx={chatMessageStyles(isSentByMe, isAudio)}>
      {isAudio && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio controls src={query}>
          {/* <track kind="captions" /> */}
        </audio>
      )}

      {!isAudio &&
        (query ? <Typography className="message" variant="body1">{query}</Typography> : <TypingEffect text={answer} />)}

      <Typography variant="subtitle2" fontSize={11} textAlign="end" color={query ? 'white' : 'grey'}>
        {time}
      </Typography>
    </Box>
  );
}

MessageItem.propTypes = {
  type: propTypes.string,
  query: propTypes.string,
  answer: propTypes.string,
  time: propTypes.string,
};

MessageItem.defaultProps = {
  type: 'text',
  query: '',
  answer: '',
  time: '',
};

export default memo(MessageItem);
