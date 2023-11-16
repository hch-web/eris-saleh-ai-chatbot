import React, { memo, useRef, useState } from 'react';
import { Box, IconButton, Paper, Stack } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { MicNoneOutlined, SendOutlined, Stop } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';
import moment from 'moment';

// COMPONENTS & UTILITIES
import FormikField from 'containers/shared/FormikField';
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
import ChatHeader from './ChatHeader';
import FeedbackPage from './FeedbackPage';
import CompletePage from './CompletePage';
import SettingsDrawer from './SettingsDrawer';
import PromtContainer from './PromtContainer';
import HumanAgentPage from './HumanAgentPage';
import ClearChatDialog from './ClearChatDialog';
import useConnectWebsocket from '../customHooks/useConnectWebsocket';
import useHandleChat from '../customHooks/useHandleChat';
import useHandleVoice from '../customHooks/useHandleVoice';
import useChatHandlers from '../customHooks/useChatHandlers';

function ChatBox({ isOpen, handleCloseChat }) {
  const messageRef = useRef(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [recentQuery, setRecentQuery] = useState(null);
  const [isBtnsDisabled, setBtnsDisabled] = useState(false);

  const socketRef = useConnectWebsocket();
  const {
    textSize,
    handleBackToChat,
    handleClearChat,
    handleClose,
    handleRegenerate,
    handleUpdateTextSize,
    toggleSettings,
    dispatchPageState,
    pagesState,
  } = useChatHandlers(
    socketRef,
    chatMessages,
    isOpen,
    handleCloseChat,
    recentQuery,
    setLoading,
    setChatMessages
  );
  const { suggestions } = useHandleChat(socketRef, chatMessages, setChatMessages, setLoading);
  const { handleStartRecording, handleStopRecording, isVoiceRecording, audioBlob } = useHandleVoice(
    socketRef,
    setChatMessages,
    setLoading,
    setRecentQuery
  );
  const {
    isChatPage,
    isFeedbackPage,
    isCompletePage,
    isMaximizedPage,
    isSettingDrawerOpen,
    isHumanAgentPage,
    isChatDialogOpen,
  } = pagesState;

  return (
    <Paper elevation={3} sx={chatBoxPaperStyles(isMaximizedPage)}>
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
              handleClearChat={() => dispatchPageState({ type: 'CHAT_DIALOG_OPEN' })}
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

        {isHumanAgentPage && <HumanAgentPage handleCancel={handleBackToChat} />}

        {/* CHAT COMPONENT */}
        <Box sx={chatPageStyles(isChatPage && !isFeedbackPage)}>
          <ClearChatDialog
            isOpen={isChatDialogOpen}
            handleClose={() => dispatchPageState({ type: 'CHAT_DIALOG_CLOSE' })}
            handleAgree={handleClearChat}
          />

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
                  isFirst={idx === 0}
                  isLast={idx === arr.length - 1}
                  handleRegenerate={handleRegenerate}
                  setBtnsDisabled={setBtnsDisabled}
                  messageId={item?.message_id}
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
                socketRef.current?.send(JSON.stringify(payload));

                setChatMessages(prevState => [...prevState, payload]);
                setRecentQuery({ type: 'text', message: values.message });

                resetForm();
              }}
            >
              {() => (
                <Form>
                  <PromtContainer suggestions={suggestions} />

                  <Stack width={1} direction="row" alignItems="center" gap={1} sx={chatFormStackStyles}>
                    <FormikField
                      name="message"
                      placeholder="Ask anything..."
                      disabled={!!audioBlob || !!isVoiceRecording}
                    />

                    {!isVoiceRecording ? (
                      <IconButton disabled={isBtnsDisabled} onClick={handleStartRecording}>
                        <MicNoneOutlined fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton disabled={isBtnsDisabled} color="error" onClick={handleStopRecording}>
                        <Stop fontSize="small" />
                      </IconButton>
                    )}

                    <IconButton disabled={isBtnsDisabled} type="submit" sx={submitBtnStyles}>
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
