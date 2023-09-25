export const API_URL = 'http://localhost:3000';
export const SOCKET_URL = 'wss://chatbot.beyonderissolutions.com/retrieval_qa';

export const getSocketURL = () => `${SOCKET_URL}/${Date.now()}`;
