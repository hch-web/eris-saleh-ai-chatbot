import React, { memo, useMemo, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { v4 } from 'uuid';
import propTypes from 'prop-types';

import { ChatBotContext } from '../context/ChatBotContext';
import { chatBoxMessageWrapperStyles, chatBoxMessagesBox } from '../utilities/styles';
import MessageItem from './MessageItem';
import { useGlobalContext } from '../context/GlobalContext';
import LoadingMessage from './LoadingMessage';

function ChatMessageContainer({ isMaximizedPage, textSize, handleRegenerate }) {
  const [isSpeaking, setSpeaking] = useState(false);
  const [isStopped, setStopped] = useState(false);

  const { chatMessages, isLoading } = useGlobalContext();

  const contextValue = useMemo(
    () => ({ isSpeaking, isStopped, setSpeaking, setStopped }),
    [isSpeaking, isStopped]
  );

  return (
    <ChatBotContext.Provider value={contextValue}>
      <Box id="chatbot-cont-wrapper" padding={1} width={1} sx={chatBoxMessageWrapperStyles(isMaximizedPage)}>
        <Box sx={chatBoxMessagesBox(textSize)}>
          {chatMessages?.map((item, idx, arr) => (item?.type === 'DIVIDER' ? (
            <Divider flexItem orientation="horizontal" key={v4()}>
              <Typography variant="caption">{item?.message}</Typography>
            </Divider>
          ) : (
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
              messageId={item?.message_id}
              audio={item?.audio}
            />
          )))}

          {isLoading && <LoadingMessage />}

          <Box id="_end-block-message" sx={{ height: '2px', width: '100%' }} />
        </Box>
      </Box>
    </ChatBotContext.Provider>
  );
}

ChatMessageContainer.propTypes = {
  handleRegenerate: propTypes.func.isRequired,
  isMaximizedPage: propTypes.bool,
  textSize: propTypes.number,
};

ChatMessageContainer.defaultProps = {
  isMaximizedPage: false,
  textSize: null,
};

export default memo(ChatMessageContainer);
