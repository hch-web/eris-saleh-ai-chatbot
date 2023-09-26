import React, { useState } from 'react';
import { Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

// COMPONENTS
import ChatBtn from './components/ChatBtn';
import ChatBox from './components/ChatBox';

function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(true);

  const toggleChatBox = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <Box className="chat-main-container">
      <AnimatePresence>
        {isChatOpen && <ChatBox isOpen={isChatOpen} handleCloseChat={toggleChatBox} />}
      </AnimatePresence>

      <ChatBtn isOpen={isChatOpen} handleClick={toggleChatBox} />
    </Box>
  );
}

export default ChatBot;
