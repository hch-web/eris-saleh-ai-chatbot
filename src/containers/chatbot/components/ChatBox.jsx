import React, { memo } from 'react';
import { Box, Paper } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

// COMPONENTS & UTILITIES
import { chatBoxPaperStyles, chatPageStyles } from '../utilities/styles';
import Footer from './Footer';
import ChatHeader from './ChatHeader';
import FeedbackPage from './FeedbackPage';
import CompletePage from './CompletePage';
import SettingsDrawer from './SettingsDrawer';
import ClearChatDialog from './ClearChatDialog';
import useConnectWebsocket from '../customHooks/useConnectWebsocket';
import useHandleChat from '../customHooks/useHandleChat';
import useHandleVoice from '../customHooks/useHandleVoice';
import useChatHandlers from '../customHooks/useChatHandlers';
import ChatForm from './ChatForm';
import ChatMessageContainer from './ChatMessageContainer';

function ChatBox() {
  useConnectWebsocket();
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
    handleConnectHumanAgent,
  } = useChatHandlers();
  const {
    isChatPage,
    isFeedbackPage,
    isCompletePage,
    isMaximizedPage,
    isSettingDrawerOpen,
    isChatDialogOpen,
  } = pagesState;

  useHandleChat();
  const { handleStartRecording, handleStopRecording, isVoiceRecording, audioBlob } = useHandleVoice();

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
              toggleSettings={toggleSettings}
              handleClearChat={() => dispatchPageState({ type: 'CHAT_DIALOG_OPEN' })}
              handleUpdateTextSize={handleUpdateTextSize}
              textSize={textSize}
              handleOpenHumanAgentPage={handleConnectHumanAgent}
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

        {/* CHAT COMPONENT */}
        <Box sx={chatPageStyles(isChatPage && !isFeedbackPage)}>
          <ClearChatDialog
            isOpen={isChatDialogOpen}
            handleClose={() => dispatchPageState({ type: 'CHAT_DIALOG_CLOSE' })}
            handleAgree={handleClearChat}
          />

          {/* CHAT MESSAGES */}
          <ChatMessageContainer
            handleRegenerate={handleRegenerate}
            isMaximizedPage={isMaximizedPage}
            textSize={textSize}
          />

          {/* MESSAGE FORM */}
          <ChatForm
            audioBlob={audioBlob}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
            isVoiceRecording={isVoiceRecording}
          />

          <Footer />
        </Box>
      </Box>
    </Paper>
  );
}

export default memo(ChatBox);
