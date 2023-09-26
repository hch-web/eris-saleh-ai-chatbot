const boxHeight = '500px';
const maxBoxHeight = '80vh';
const headHeight = '60px';
const formHeight = '104px';
const footerHeight = '28px';

export const chatBoxPaperStyles = isMax => ({
  width: isMax ? '95vw' : '400px',
  maxWidth: isMax ? '95vw' : '400px',
  position: 'fixed',
  right: '1rem',
  bottom: '5rem',
  height: isMax ? maxBoxHeight : boxHeight,
  maxHeight: isMax ? maxBoxHeight : boxHeight,
  borderRadius: '10px',
  overflow: 'hidden',
  transition: '0.2s ease-in-out',
  zIndex: '999999999999',

  '@media (max-width: 580px)': {
    // width: isMax ? '95vw' : '75vw',
    // maxWidth: isMax ? '95vw' : '75vw',
    width: '95vw',
    maxWidth: '95vw',
    height: maxBoxHeight,
    maxHeight: maxBoxHeight,
    right: 0,
    margin: '0 10px',
  },
});

export const chatBtnWrapperStyles = {
  position: 'fixed',
  right: '1rem',
  bottom: '1rem',
  zIndex: '999999999999',
};

export const chatBtnStyles = {
  background: theme => theme.palette.primary.main,

  ':hover': {
    background: theme => theme.palette.primary.main,
  },
};

export const chatBoxHeaderBtnStyles = {
  color: 'white',
  '@media screen and (max-width: 768px)': { fontSize: '22px' },
};

export const chatFormStackStyles = { background: '#f8f8f8', padding: '6px' };

export const submitBtnStyles = {
  background: theme => theme.palette.primary.main,
  ':hover': {
    background: theme => theme.palette.primary.main,
  },
};

export const scrollStyles = {
  '::-webkit-scrollbar': {
    width: '4px',
    height: '4px',
  },
  '::-webkit-scrollbar-track': {
    background: '#e3e3e3',
  },
  '::-webkit-scrollbar-thumb': {
    background: '#c5c5c5',
    borderRadius: '10px',
  },
};

export const chatBoxMessageWrapperStyles = isMax => ({
  maxHeight: `calc(${isMax ? maxBoxHeight : boxHeight} - ${headHeight} - ${formHeight} - ${footerHeight})`,
  height: `calc(${isMax ? maxBoxHeight : boxHeight} - ${headHeight} - ${formHeight} - ${footerHeight})`,
  overflowY: 'auto',

  ...scrollStyles,

  '@media screen and (max-width: 580px)': {
    maxHeight: `calc(${maxBoxHeight} - ${headHeight} - ${formHeight} - ${footerHeight})`,
    height: `calc(${maxBoxHeight} - ${headHeight} - ${formHeight} - ${footerHeight})`,
  },
});

export const chatBoxMessagesBox = textSize => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',

  '& .message': {
    fontSize: textSize,
  },
});

export const loadingMessageStyles = {
  background: theme => theme.palette.primary.main,
  padding: '3px 8px',
  borderRadius: '7px 7px 7px 0',
};

export const feedbackBoxStyles = isMax => ({
  height: `calc(${isMax ? maxBoxHeight : boxHeight} - ${headHeight})`,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  ...scrollStyles,

  '@media screen and (max-width: 580px)': {
    height: `calc(${maxBoxHeight} - ${headHeight})`,
  },
});

export const completeBoxStyles = isMax => ({
  height: `calc(${isMax ? maxBoxHeight : boxHeight} - ${headHeight})`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '30px',

  '@media screen and (max-width: 580px)': {
    height: `calc(${maxBoxHeight} - ${headHeight})`,
  },
});

export const humanAgentBoxStyles = isMax => ({
  height: `calc(${isMax ? maxBoxHeight : boxHeight} - ${headHeight})`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',

  '@media screen and (max-width: 580px)': {
    height: `calc(${maxBoxHeight} - ${headHeight})`,
  },
});

export const feedbackBtnStyles = isActive => ({
  textTransform: 'capitalize',
  fontSize: '12px',
  width: '100%',
  height: '100%',
  minHeight: '35px',
  padding: '3px 6px',
  whiteSpace: 'nowrap',
  background: theme => (isActive ? theme.palette.primary.main : ''),
  color: theme => (isActive ? 'white' : theme.palette.primary.main),
  border: theme => `1px solid ${theme.palette.primary.main} !important`,

  ':hover': {
    background: theme => (isActive ? theme.palette.primary.main : ''),
  },
});

export const feedbackBackBtnStyles = {
  background: 'grey',
  color: 'white',
  textTransform: 'capitalize',

  ':hover': {
    background: 'grey',
  },
};

export const footerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: footerHeight,
  width: '100%',
  position: 'absolute',
  bottom: 0,

  '@media screen and (max-width: 580px)': {
    height: '27px',

    '& p': {
      fontSize: '11px',
    },
  },

  '& p': {
    fontSize: '12px',
    color: '#4d4d4d',
  },
};

export const chatMessageStyles = (isSentByMe, isAudio) => ({
  padding: '4px 8px',
  background: theme => (isSentByMe ? theme.palette.primary.main : '#efefef'),
  color: isSentByMe ? 'white' : 'black',
  borderRadius: isSentByMe ? '6px 6px 0px 6px' : '6px 6px 6px 0px',
  width: 'auto',
  maxWidth: '80%',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',

  ...(isAudio && {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',

    'audio::-webkit-media-controls-panel': {
      background: theme => theme.palette.primary.main,
    },

    'audio::-webkit-media-controls-play-button': {
      backgroundColor: '#fff',
      borderRadius: '50%',
    },

    'audio::-webkit-media-controls-current-time-display, audio::-webkit-media-controls-time-remaining-display':
      {
        color: '#fff',
      },

    '& audio': {
      maxWidth: '100%',
    },
  }),
});

export const chatPromptContainerStyles = {
  width: '100%',
  overflowX: 'auto',
  marginBottom: '5px',
  paddingBottom: '3px',
  ...scrollStyles,
};

export const chatPropmtBoxStyles = {
  padding: '2px 4px',
  fontSize: '12px',
  color: '#4d4d4d',
  background: '#e3e3e3',
  cursor: 'pointer',
  borderRadius: '3px',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  lineHeight: '18px',

  ':hover': {
    background: '#dadada',
    color: theme => theme.palette.primary.main,
  },
};

export const proActiveBoxStyles = {
  padding: '8px 12px',
  fontWeight: 'bold',
  fontSize: '13px',
  color: '#222222 !important',
  background: 'white',
  borderRadius: '20px 20px 0 20px',
  position: 'fixed',
  right: '1.5rem',
  bottom: '5rem',
  zIndex: '999999999999',
  boxShadow: '0 0 10px grey'
};

export const msgRespButtonStyles = {
  fontSize: 12,
  textTransform: 'capitalize',
  border: theme => `1px solid ${theme.palette.primary.main}`,
};

export const msgFeedbackButtonStyles = {
  fontSize: 12,
};

export const chatPageStyles = isOpen => ({
  display: isOpen ? 'flex' : 'none',
  flexDirection: 'column',
  alignItems: 'flex-start',
});
