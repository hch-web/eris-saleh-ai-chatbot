import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';

// COMPONENTS
import ChatBtn from './components/ChatBtn';
import ChatBox from './components/ChatBox';
import { GlobalContext } from './context/GlobalContext';
import { chatPrompts } from './utilities/data';

function ChatBot() {
  const [socket, setSocket] = useState(null);
  const [suggestions, setSuggestions] = useState(chatPrompts);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [recentQuery, setRecentQuery] = useState(null);
  const [isBtnsDisabled, setBtnsDisabled] = useState(false);
  const [isHumanAgent, setHumanAgent] = useState(false);

  const toggleChatBox = () => {
    setIsChatOpen(!isChatOpen);

    if (chatMessages?.length > 0) {
      setChatMessages([]);
    }
  };

  const contextValue = useMemo(
    () => ({
      isChatOpen,
      setIsChatOpen,
      chatMessages,
      setChatMessages,
      isLoading,
      setLoading,
      recentQuery,
      setRecentQuery,
      isBtnsDisabled,
      setBtnsDisabled,
      toggleChatBox,
      socket,
      setSocket,
      isHumanAgent,
      setHumanAgent,
      suggestions,
      setSuggestions,
    }),
    [isChatOpen, isLoading, chatMessages, recentQuery, isBtnsDisabled, socket, isHumanAgent, suggestions]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      <Box className="chat-main-container">
        {isChatOpen && <ChatBox isOpen={isChatOpen} handleCloseChat={toggleChatBox} />}

        <ChatBtn isOpen={isChatOpen} handleClick={toggleChatBox} />
      </Box>
    </GlobalContext.Provider>
  );
}

export default ChatBot;
