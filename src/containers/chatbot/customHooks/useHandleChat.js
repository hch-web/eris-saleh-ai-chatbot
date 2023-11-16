import { useEffect, useState } from 'react';
import moment from 'moment';
import { chatPrompts } from '../utilities/data';

const useHandleChat = (socketRef, chatMessages, setChatMessages, setLoading) => {
  const [suggestions, setSuggestions] = useState(chatPrompts);

  useEffect(() => {
    const socket = socketRef.current;

    if (socket) {
      socket.onmessage = e => {
        const data = JSON.parse(e.data);

        if ('answer' in data) {
          setChatMessages(prevState => [...prevState, { ...data, timestamp: moment().format('hh:mm A') }]);
          setLoading(false);
        }
        if ('suggestion' in data) {
          setSuggestions(data.suggestion);
        }
      };
    }
  }, [socketRef]);

  useEffect(() => {
    if (chatMessages?.length > 0) {
      const endMessage = document.getElementById('_end-block-message');
      endMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  return { suggestions };
};

export default useHandleChat;
