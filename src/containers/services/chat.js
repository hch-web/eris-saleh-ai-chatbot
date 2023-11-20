import axios from 'axios';

const API_URL = 'http://157.241.54.34:9000/api/v1';

export const getVoiceAudio = async text => {
  const response = await axios.post(`${API_URL}/speech`, { text });

  return response.data;
};

export const tets = '';
