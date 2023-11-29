import { useEffect, useState } from 'react';
import moment from 'moment';
import { getVoiceAudio } from 'containers/services/chat';
import { chatPrompts } from '../utilities/data';

const useHandleChat = (socketRef, chatMessages, setChatMessages, setLoading) => {
  const [suggestions, setSuggestions] = useState(chatPrompts);

  useEffect(() => {
    const socket = socketRef.current;

    // if (socket) {
    //   socket.onmessage = e => {
    //     const data = JSON.parse(e.data);

    //     if ('answer' in data) {
    //       setChatMessages(prevState => [...prevState, { ...data, timestamp: moment().format('hh:mm A') }]);
    //       setLoading(false);
    //     }
    //     if ('suggestion' in data) {
    //       setSuggestions(data.suggestion);
    //     }
    //   };
    // }

    if (socket) {
      socket.onmessage = async e => {
        const data = JSON.parse(e.data);

        if ('answer' in data) {
          const messageObj = {
            answer: data?.answer,
            timestamp: moment().format('hh:mm A'),
            isQuery: false,
            type: 'text',
            audio: null,
          };

          setChatMessages(prevState => [...prevState, messageObj]);
          setLoading(false);

          const audioFile = await getVoiceAudio(data?.answer);

          setChatMessages(prevState => {
            const updatedMessages = [...prevState];
            const lastMessage = updatedMessages.at(-1);
            lastMessage.audio = audioFile?.file;

            return updatedMessages;
          });
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
