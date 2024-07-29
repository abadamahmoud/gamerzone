import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (serverUrl: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(serverUrl);

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [serverUrl]);

  return socket;
};

export default useSocket;
