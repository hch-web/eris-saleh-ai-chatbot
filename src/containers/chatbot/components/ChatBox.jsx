import React, { memo, useEffect, useReducer, useRef, useState } from 'react';
import { Box, IconButton, Paper, Stack } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { MicNoneOutlined, SendOutlined, Stop } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';
import moment from 'moment';

// COMPONENTS & UTILITIES
import FormikField from 'containers/shared/FormikField';
import { getSocketURL } from 'utilities/constants';
import {
  chatBoxMessageWrapperStyles,
  chatBoxMessagesBox,
  chatBoxPaperStyles,
  chatFormStackStyles,
  chatPageStyles,
  submitBtnStyles,
} from '../utilities/styles';
import MessageItem from './MessageItem';
import LoadingMessage from './LoadingMessage';
import Footer from './Footer';
import { chatBoxAnimationProps } from '../utilities/animations';
import ChatHeader from './ChatHeader';
import FeedbackPage from './FeedbackPage';
import CompletePage from './CompletePage';
import SettingsDrawer from './SettingsDrawer';
import PromtContainer from './PromtContainer';
import { pageInitState, pagesReducers } from '../utilities/reducers';
import HumanAgentPage from './HumanAgentPage';

const socket = new WebSocket(getSocketURL());

function ChatBox({ isOpen, handleCloseChat }) {
  const messageRef = useRef(null);
  const mediaRecorder = useRef(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isVoiceRecording, setVoiceRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [textSize, setTextSize] = useState(14);
  const [recentQuery, setRecentQuery] = useState(null);
  const [pagesState, dispatchPageState] = useReducer(pagesReducers, pageInitState);
  const {
    isChatPage,
    isFeedbackPage,
    isCompletePage,
    isMaximizedPage,
    isSettingDrawerOpen,
    isHumanAgentPage,
  } = pagesState;

  // HANDLING WEB-SOCKET ONMESSAGE EVENT
  useEffect(() => {
    if (socket) {
      socket.onmessage = e => {
        const data = JSON.parse(e.data);

        setChatMessages(prevState => [...prevState, { ...data, timestamp: moment().format('hh:mm A') }]);
        setLoading(false);
      };
    }
  }, [socket]);

  // SCROLL TO BOTTOM ON NEW MESSAGE
  useEffect(() => {
    if (chatMessages?.length > 0) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleClose = () => {
    // OPEN FEEDBACK PAGE
    if (isChatPage) {
      dispatchPageState({ type: 'OPEN_FEEDBACK' });
      return;
    }

    // OPEN COMPLETE PAGE
    if (isFeedbackPage) {
      dispatchPageState({ type: 'OPEN_COMPLETE' });
      return;
    }

    // CLOSE CHAT
    if (isCompletePage && isOpen) {
      dispatchPageState({ type: 'CLOSE_COMPLETE' });
      handleCloseChat();
    }
  };

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    mediaRecorder.current.ondataavailable = async event => {
      if (event.data.size > 0) {
        setAudioBlob(event.data);

        socket.send(event.data);
        setChatMessages(prevState => [
          ...prevState,
          { query: URL.createObjectURL(event.data), type: 'audio' },
        ]);
        setAudioBlob(null);
        setLoading(true);
      }
    };

    mediaRecorder.current.start();
    setVoiceRecording(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    setVoiceRecording(false);
  };

  const toggleSettings = () => {
    dispatchPageState({ type: 'TOGGLE_SETTINGS_DRAWER' });
  };

  const handleUpdateTextSize = value => {
    setTextSize(value);
  };

  const handleRegenerate = () => {
    setLoading(true);
    socket.send(JSON.stringify({ query: recentQuery, type: 'text' }));
  };

  const handleBackToChat = () => {
    dispatchPageState({ type: 'BACK_TO_CHAT' });
  };

  return (
    <Paper
      elevation={3}
      component={motion.div}
      sx={chatBoxPaperStyles(isMaximizedPage)}
      {...chatBoxAnimationProps}
    >
      <Box height={1} sx={{ position: 'relative' }}>
        <ChatHeader
          isMaximized={isMaximizedPage}
          toggleSettings={toggleSettings}
          handleClose={handleClose}
          toggleMaximize={() => dispatchPageState({ type: 'TOGGLE_MAXIMIZE' })}
        />

        {/* SETTTINGS DRAWER */}
        <AnimatePresence>
          {isSettingDrawerOpen && (
            <SettingsDrawer
              chatMessages={chatMessages}
              toggleSettings={toggleSettings}
              handleClearChat={() => setChatMessages([])}
              handleUpdateTextSize={handleUpdateTextSize}
              textSize={textSize}
              handleOpenHumanAgentPage={() => dispatchPageState({ type: 'OPEN_HUMAN_PAGE' })}
            />
          )}
        </AnimatePresence>

        {/* FEEDBACK COMPONENT */}
        {isFeedbackPage && (
          <FeedbackPage
            handleBackToChat={handleBackToChat}
            handleClose={handleClose}
            isMaximized={isMaximizedPage}
          />
        )}

        {isCompletePage && <CompletePage />}

        {isHumanAgentPage && (
          <HumanAgentPage handleCancel={() => dispatchPageState({ type: 'OPEN_FEEDBACK' })} />
        )}

        {/* CHAT COMPONENT */}
        <Box sx={chatPageStyles(isChatPage && !isFeedbackPage)}>
          {/* CHAT MESSAGES */}
          <Box
            id="chatbot-cont-wrapper"
            padding={1}
            width={1}
            sx={chatBoxMessageWrapperStyles(isMaximizedPage)}
          >
            <Box sx={chatBoxMessagesBox(textSize)}>
              {chatMessages?.map((item, idx, arr) => (
                <MessageItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  type={item?.type}
                  answer={item?.answer}
                  query={item?.query}
                  time={item?.timestamp}
                  isLast={idx === arr.length - 1}
                  handleRegenerate={handleRegenerate}
                />
              ))}

              {isLoading && <LoadingMessage />}

              <Box id="_end-block-message" ref={messageRef} sx={{ height: '2px', width: '100%' }} />
            </Box>
          </Box>

          {/* MESSAGE FORM */}
          <Box padding={1} width={1}>
            <Formik
              initialValues={{ message: '' }}
              onSubmit={(values, { resetForm }) => {
                if (!values.message) return;

                const payload = {
                  query: values.message,
                  type: 'text',
                  timestamp: moment().format('hh:mm A'),
                };

                setLoading(true);
                socket.send(JSON.stringify(payload));

                setChatMessages(prevState => [...prevState, payload]);
                setRecentQuery(values.message);

                resetForm();
              }}
            >
              {() => (
                <Form>
                  <PromtContainer />

                  <Stack width={1} direction="row" alignItems="center" gap={1} sx={chatFormStackStyles}>
                    <FormikField
                      name="message"
                      placeholder="Ask anything..."
                      disabled={!!audioBlob || !!isVoiceRecording}
                    />

                    {!isVoiceRecording ? (
                      <IconButton onClick={handleStartRecording}>
                        <MicNoneOutlined fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton color="error" onClick={handleStopRecording}>
                        <Stop fontSize="small" />
                      </IconButton>
                    )}

                    <IconButton type="submit" sx={submitBtnStyles}>
                      <SendOutlined fontSize="small" sx={{ color: 'white' }} />
                    </IconButton>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>

          <Footer />
        </Box>
      </Box>
    </Paper>
  );
}

ChatBox.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleCloseChat: propTypes.func.isRequired,
};

export default memo(ChatBox);
