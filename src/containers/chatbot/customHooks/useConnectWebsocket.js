import { useEffect, useRef } from 'react';
import { getSocketURL } from 'utilities/constants';

const useConnectWebsocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    const newChatId = Date.now();
    localStorage.setItem('chatId', newChatId);
    const socket = new WebSocket(getSocketURL(newChatId));
    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  return socketRef;
};

export default useConnectWebsocket;
