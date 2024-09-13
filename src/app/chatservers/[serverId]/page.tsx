"use client"; // Ensure this component is client-side

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useSocket from '@/context/useSocket';

const ServerPage = () => {
  const pathname = usePathname();
  const serverId = pathname?.split('/')[2]; // 2 becomes 4 on production
  const [server, setServer] = useState<any>(null);
  const socket = useSocket('http://localhost:4000'); 
  const [channels, setChannels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (serverId) {
      const fetchServerData = async () => {
        try {
          const serverResponse = await fetch(`/api/servers/${serverId}`);
          if (!serverResponse.ok) throw new Error('Server not found');
          const serverData = await serverResponse.json();
          setServer(serverData);

          const channelsResponse = await fetch(`/api/channels?serverId=${serverId}`);
          if (!channelsResponse.ok) throw new Error('Channels not found');
          const channelsData = await channelsResponse.json();
          setChannels(channelsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchServerData();
    }
  }, [serverId]);


    useEffect(() => {
      if (!socket) return;
      socket.emit('joinServer', serverId);

      socket.on('serverDeleted', ()=> {
        router.push('/chatservers');
      });

      return () => {
        socket.emit('leaveServer', serverId);
        socket.off('serverDeleted');
      };
    }, [socket, serverId, router]); 
    
  

  const handleDeleteServer = async () => {
    try {
      const response = await fetch(`/api/servers/${serverId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete server');
      }

      const result = await response.json();

      // Emit an event to update the UI via Socket.IO
      if (socket) {
        socket.emit('serverDeleted');

      }

      return result;
    } catch (error) {
      console.error('Error deleting server:', error);
    }
  };

  if (loading) return <div className='mt-24'>Loading...</div>;

  return (
    <div className='border rounded-sm w-full p-16  h-auto mb-4 mt-16 my-auto items-center flex flex-col mr-2'>
      <h1 className='text-3xl border text-left rounded-sm p-4 w-full'>Server: {server?.name}</h1>
      
      <ul className='border rounded-sm p-4 w-full  '>
        <p className='text-2xl underline mb-4'>Channels in this servers:</p>
        {channels.map((channel) => (
          <li className='my-2 text-xl overflow-y-auto' key={channel.id}>{channel.name}</li>
        ))}
      </ul>
      <button className='border text-red-500 rounded-sm w-full text-xl p-4 my-2' onClick={handleDeleteServer}>
        Delete This Server
      </button>
    </div>
  );
};

export default ServerPage;
