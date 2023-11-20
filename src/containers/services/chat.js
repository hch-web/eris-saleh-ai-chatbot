import axios from 'axios';

const API_URL = 'https://chat-tts.beyonderissolutions.com/api/v1';

export const getVoiceAudio = async text => {
  const response = await axios.post(`${API_URL}/speech`, { text });

  return response.data;
};

export const tets = '';
