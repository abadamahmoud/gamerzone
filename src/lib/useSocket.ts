// lib/useSocket.ts
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your server URL

export const useSocket = () => {
  useEffect(() => {
    // Connect to the socket server
    socket.connect();
/*
    return () => {
      // Disconnect from the socket server on unmount
      socket.disconnect();
    };*/
  }, []);

  return socket;
};
