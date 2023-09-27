/* eslint-disable no-debugger */
import React, { memo, useEffect, useState } from 'react';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { RecordVoiceOver } from '@mui/icons-material';

function TypingEffect({ text, stopAnimation, setStopAnimation }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [contextMenu, setContextMenu] = useState(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (text && currentIndex < text?.length && !stopAnimation) {
      const timer = setTimeout(() => {
        setDisplayText(prevState => prevState + text[currentIndex]);
        setCurrentIndex(prevState => prevState + 1);
      }, 30);

      return () => {
        clearTimeout(timer);
      };
    }

    setStopAnimation(true);
  }, [currentIndex, text, stopAnimation]);

  useEffect(() => {
    const contEl = document.getElementById('chatbot-cont-wrapper');
    const invisibleEL = document.getElementById('_end-block-message');

    if (isAutoScrollEnabled) {
      invisibleEL.scrollIntoView();
    }

    const handleScroll = () => {
      if (contEl.scrollHeight - contEl.scrollTop > contEl.clientHeight + 5) {
        setAutoScrollEnabled(false);
      }
    };

    contEl.addEventListener('scroll', handleScroll);

    return () => {
      contEl.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex]);

  const handleContextMenu = e => {
    e.preventDefault();

    if (window.getSelection().toString() !== '') {
      setContextMenu(prevState => (prevState === null ? { mouseX: e.clientX - 2, mouseY: e.clientY - 4 } : null));
    }
  };

  const handleCloseMenu = () => {
    setContextMenu(null);
  };

  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    const selectedText = window.getSelection().toString();
    const utterance = new SpeechSynthesisUtterance(selectedText);
    synth.speak(utterance);

    setContextMenu(null);
  };

  return (
    <Box onContextMenu={handleContextMenu}>
      <Typography variant="body1" className="message" color="black">
        {displayText}
      </Typography>

      <Menu
        onClose={handleCloseMenu}
        open={!!contextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
        disablePortal
        sx={{ '& ul': { padding: 0 } }}
      >
        <MenuItem onClick={handleSpeak}>
          <RecordVoiceOver color="primary" />
        </MenuItem>
      </Menu>
    </Box>
  );
}

TypingEffect.propTypes = {
  stopAnimation: propTypes.bool.isRequired,
  setStopAnimation: propTypes.func.isRequired,
  text: propTypes.string,
};

TypingEffect.defaultProps = {
  text: '',
};

export default memo(TypingEffect);
