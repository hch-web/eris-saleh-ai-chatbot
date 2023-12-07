export const API_URL = 'https://eris-ai-backend.beyonderissolutions.com/api';
export const SOCKET_URL = 'wss://eris-ai-backend.beyonderissolutions.com/api/ws/user-chat';
export const HUMAN_AGENT_SOCKET_URL = 'wss://eris-ai-backend.beyonderissolutions.com/api/ws/admin-chat';

export const getSocketURL = () => `${SOCKET_URL}/${Date.now()}`;
export const getHumanAgentSocketURL = () => {
  const roomId = localStorage.getItem('chatId');

  return `${HUMAN_AGENT_SOCKET_URL}/${roomId}`;
};

export const avatarImgURL = 'https://bes-software-bucket.s3.ap-south-1.amazonaws.com/hassen8558.png';
