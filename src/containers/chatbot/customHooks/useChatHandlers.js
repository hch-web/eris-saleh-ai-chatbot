import { useReducer, useState } from 'react';
import { pageInitState, pagesReducers } from '../utilities/reducers';

const useChatHandlers = (
  socketRef,
  chatMessages,
  isOpen,
  handleCloseChat,
  recentQuery,
  setLoading,
  setChatMessages
) => {
  const [textSize, setTextSize] = useState(14);
  const [pagesState, dispatchPageState] = useReducer(pagesReducers, pageInitState);
  const { isChatPage, isFeedbackPage, isCompletePage } = pagesState;

  const handleClose = () => {
    // OPEN FEEDBACK PAGE
    if (isChatPage && chatMessages?.length === 1) {
      dispatchPageState({ type: 'CLOSE_COMPLETE' });
      handleCloseChat();
      return;
    }

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

  const toggleSettings = () => {
    dispatchPageState({ type: 'TOGGLE_SETTINGS_DRAWER' });
  };

  const handleUpdateTextSize = value => {
    setTextSize(value);
  };

  const handleRegenerate = () => {
    const blockMsg = document.getElementById('_end-block-message');
    setLoading(true);
    if (recentQuery?.type === 'audio') {
      socketRef.current?.send(recentQuery.query);
    } else {
      socketRef.current?.send(JSON.stringify({ query: recentQuery.message, type: 'text' }));
    }
    blockMsg.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBackToChat = () => {
    dispatchPageState({ type: 'BACK_TO_CHAT' });
  };

  const handleClearChat = () => {
    setChatMessages([]);
    dispatchPageState({ type: 'CHAT_DIALOG_CLOSE' });
  };

  return {
    textSize,
    handleClearChat,
    handleBackToChat,
    handleRegenerate,
    handleUpdateTextSize,
    toggleSettings,
    handleClose,
    dispatchPageState,
    pagesState,
  };
};

export default useChatHandlers;
