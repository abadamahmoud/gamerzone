import { io, Socket } from 'socket.io-client';

let socket: Socket;
let serverUrl: string;

export const initializeSocket = (url: string) => {
  serverUrl = url;
  socket = io(url);
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket is not initialized. Call initializeSocket first.');
  }
  return socket;
};

export const getIoServer = () => {
  if (!serverUrl) {
    throw new Error('Server URL is not set.');
  }
  return io(serverUrl);  // Ensure this returns the Server instance
};
