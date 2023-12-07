import { createContext, useContext } from 'react';

export const GlobalContext = createContext({
  isChatOpen: false,
  setIsChatOpen: () => {},
  chatMessages: [],
  setChatMessages: () => {},
  isLoading: false,
  setLoading: () => {},
  recentQuery: null,
  setRecentQuery: () => {},
  isBtnsDisabled: false,
  setBtnsDisabled: () => {},
  toggleChatBox: () => {},
  socket: WebSocket,
  setSocket: () => {},
  isHumanAgent: false,
  setHumanAgent: () => {},
  suggestions: [],
  setSuggestions: () => {},
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  return context;
};
