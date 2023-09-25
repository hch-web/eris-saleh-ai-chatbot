const boxHeight = '500px';
const maxBoxHeight = '80vh';
const headHeight = '56px';
const formHeight = '104px';
const footerHeight = '30px';

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
    width: isMax ? '95vw' : '75vw',
    maxWidth: isMax ? '95vw' : '75vw',
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

export const chatBoxHeaderBtnStyles = { color: 'white' };

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
  ...scrollStyles,
});

export const completeBoxStyles = isMax => ({
  height: `calc(${isMax ? maxBoxHeight : boxHeight} - ${headHeight})`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '30px',
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

  ':hover': {
    background: theme => (isActive ? theme.palette.primary.main : ''),
  },
});

export const feedbackResolveBtnStyles = {
  background: '#e3e3e3',
  color: 'black',
  ':hover': {
    background: '#dadada',
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
  alignSelf: isSentByMe ? 'flex-end' : 'flex-start',
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
