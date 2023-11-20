import { createContext, useContext } from 'react';

export const ChatBotContext = createContext({
  isSpeaking: false,
  setSpeaking: () => {},
  isStopped: false,
  setStopped: () => {},
});

export const useChatBotContext = () => {
  const context = useContext(ChatBotContext);

  return context;
};
