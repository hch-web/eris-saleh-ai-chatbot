import React, { memo, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import propTypes from 'prop-types';

function TypingEffect({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollEnabled, setAutoScrollEnabled] = useState(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (text && currentIndex < text?.length) {
      const timer = setTimeout(() => {
        setDisplayText(prevState => prevState + text[currentIndex]);
        setCurrentIndex(prevState => prevState + 1);
      }, 30);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentIndex, text]);

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

  return <Typography variant="body1" className="message">{displayText}</Typography>;
}

TypingEffect.propTypes = {
  text: propTypes.string,
};

TypingEffect.defaultProps = {
  text: '',
};

export default memo(TypingEffect);
