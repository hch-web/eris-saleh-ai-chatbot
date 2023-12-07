import { useCallback, useReducer, useState } from 'react';
import { getHumanAgentSocketURL } from 'utilities/constants';
import { pageInitState, pagesReducers } from '../utilities/reducers';
import { useGlobalContext } from '../context/GlobalContext';

const useChatHandlers = () => {
  const [textSize, setTextSize] = useState(14);
  const [pagesState, dispatchPageState] = useReducer(pagesReducers, pageInitState);
  const { isChatPage, isFeedbackPage, isCompletePage } = pagesState;

  const {
    chatMessages,
    toggleChatBox,
    setChatMessages,
    isChatOpen,
    setLoading,
    recentQuery,
    socket,
    setSocket,
    setHumanAgent,
  } = useGlobalContext();

  const handleClose = () => {
    // OPEN FEEDBACK PAGE
    if (isChatPage && chatMessages?.length === 1) {
      dispatchPageState({ type: 'CLOSE_COMPLETE' });
      toggleChatBox();
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
    if (isCompletePage && isChatOpen) {
      dispatchPageState({ type: 'CLOSE_COMPLETE' });
      toggleChatBox();
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
      socket.send(recentQuery.query);
    } else {
      socket.send(JSON.stringify({ query: recentQuery.message, type: 'text' }));
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

  const handleConnectHumanAgent = useCallback(() => {
    const humanAgentSocket = new WebSocket(getHumanAgentSocketURL());
    const newChatMessages = [...chatMessages];
    newChatMessages.push({ type: 'DIVIDER', message: 'Human Agent chat' });

    dispatchPageState({ type: 'BACK_TO_CHAT' });
    setChatMessages(newChatMessages);
    setSocket(humanAgentSocket);
    setHumanAgent(true);
  }, [chatMessages, socket]);

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
    handleConnectHumanAgent,
  };
};

export default useChatHandlers;
