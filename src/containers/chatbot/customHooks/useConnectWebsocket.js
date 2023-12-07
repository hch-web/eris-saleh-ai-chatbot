import { useEffect, useRef } from 'react';
import { getSocketURL } from 'utilities/constants';
import { useGlobalContext } from '../context/GlobalContext';

const useConnectWebsocket = () => {
  const socketRef = useRef(null);
  const { setSocket } = useGlobalContext();

  useEffect(() => {
    const newChatId = Date.now();
    localStorage.setItem('chatId', newChatId);
    const socket = new WebSocket(getSocketURL(newChatId));
    socketRef.current = socket;
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  return null;
};

export default useConnectWebsocket;
