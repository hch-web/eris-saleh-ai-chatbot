import { createContext, useContext } from 'react';

export const ChatContext = createContext({
  chatId: null,
  setChatId: () => {},
});

export const useChatContext = () => {
  const context = useContext(ChatContext);

  return context;
};
