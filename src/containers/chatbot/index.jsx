import React, { useState } from 'react';
import { Box } from '@mui/material';

// COMPONENTS
import ChatBtn from './components/ChatBtn';
import ChatBox from './components/ChatBox';

function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatBox = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <Box className="chat-main-container">
      {isChatOpen && <ChatBox isOpen={isChatOpen} handleCloseChat={toggleChatBox} />}

      <ChatBtn isOpen={isChatOpen} handleClick={toggleChatBox} />
    </Box>
  );
}

export default ChatBot;
