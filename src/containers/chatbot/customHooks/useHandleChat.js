import { useEffect } from 'react';
import moment from 'moment';
import { getVoiceAudio } from 'containers/services/chat';
import { useGlobalContext } from '../context/GlobalContext';

const useHandleChat = () => {
  const { setChatMessages, chatMessages, setLoading, socket, isHumanAgent, setSuggestions } =
    useGlobalContext();

  useEffect(() => {
    if (socket) {
      socket.onmessage = async e => {
        const data = JSON.parse(e.data);

        if (isHumanAgent) {
          const messageObj = {
            timestamp: moment().format('hh:mm A'),
            isQuery: data?.message_from === 'Human',
            type: 'text',
            audio: null,
            message_id: data?.id,
            ...(data?.message_from === 'Human'
              ? { query: data?.text_message }
              : {
                answer: data?.text_message,
              }),
          };

          setChatMessages(prevState => [...prevState, messageObj]);
        } else {
          if ('answer' in data) {
            const messageObj = {
              answer: data?.answer,
              timestamp: moment().format('hh:mm A'),
              isQuery: false,
              type: 'text',
              audio: null,
              message_id: data?.message_id,
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
        }
      };
    }
  }, [socket, isHumanAgent]);

  useEffect(() => {
    if (chatMessages?.length > 0) {
      const endMessage = document.getElementById('_end-block-message');
      endMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  return null;
};

export default useHandleChat;
