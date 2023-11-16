export const API_URL = 'http://localhost:3000';
// export const SOCKET_URL = 'wss://chatbot.beyonderissolutions.com/retrieval_qa';
export const SOCKET_URL = 'wss://eris-ai-backend.beyonderissolutions.com/api/ws/user-chat';

export const getSocketURL = () => `${SOCKET_URL}/${Date.now()}`;

export const avatarImgURL = 'https://bes-software-bucket.s3.ap-south-1.amazonaws.com/hassen8558.png';
