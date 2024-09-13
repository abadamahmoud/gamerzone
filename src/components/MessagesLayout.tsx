import React, { useState, useEffect } from 'react';
import useSocket from '@/context/useSocket';
import { useUser } from '@/context/UserContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const MessagesLayout = () => {
  const { user, loading } = useUser();
  const socket = useSocket('http://localhost:4000');
  const [servers, setServers] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [selectedServer, setSelectedServer] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  
  useEffect(() => {
    if (user) {
      const fetchServers = async () => {
        try {
          const serverResponse = await fetch(`/api/servers?userId=${user.id}`);
          const serverData = await serverResponse.json();
          setServers(serverData);
          if (serverData.length > 0) {
            setSelectedServer(serverData[0].id);
          }
        } catch (err) {
          setError('Failed to fetch servers');
        }
      };

      fetchServers();
    }
  }, [user]);

  useEffect(() => {
    if (selectedServer) {
      const fetchChannels = async (serverId: string) => {
        try {
          const response = await fetch(`/api/channels?serverId=${serverId}`);
          const data = await response.json();
          setChannels(data);
          router.push(`/chatservers/${selectedServer}`)
        } catch (err) {
          setError('Failed to fetch channels');
        }
      };
      fetchChannels(selectedServer);
    }
  }, [selectedServer, router]);

  useEffect(() => {
    if (socket) {
      socket.on('updateServers', async () => {
        const response = await fetch(`/api/servers?userId=${user?.id}`);
        const data = await response.json();
        setServers(data);
        if (data.length > 0) {
          setSelectedServer(data[0].id);
        }
      });

      socket.on('updateChannels', async () => {
        if (selectedServer) {
          
          const response = await fetch(`/api/channels?serverId=${selectedServer}`);
          const data = await response.json();
          setChannels(data);
        }
      });

      return () => {
        socket.off('updateServers');
        socket.off('updateChannels');
      };
    }
  }, [socket, selectedServer, user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>Please log in to view your messages.</div>;

  return (
    <div className='flex pt-16 px-2 flex-col items-start gap-2 w-1/4 min-w-72 lg:w-1/4 h-full'>
      

      {servers.length > 0 && <Select value={selectedServer} onValueChange={setSelectedServer}>
        <SelectTrigger className="w-full text-lg hover:dark:bg-neutral-800 hover:bg-neutral-100 h-12">
          <SelectValue placeholder={<div className='flex gap-2 items-center'>
            {servers[0] && (
              <>
                <Image src={servers[0].image} alt={servers[0].name} className='w-10 h-10 object-cover rounded-full' />
                <span>{servers[0].name}</span>
              </>
            )}
          </div>} />
        </SelectTrigger>
        <SelectContent>
          {servers.length > 0 && servers.map(server => (
            <SelectItem key={server.id} value={server.id}>
              <div className='flex gap-2 text-lg items-center'>
                <Image src={server.image} alt={server.name} className='w-10 h-10 object-cover rounded-full' />
                <span>{server.name}</span>
              </div>
            </SelectItem>
          )) }
        </SelectContent>
      </Select>}
      <Link href="/chatservers/newserver" className='w-full'>
        <Button variant={'outline'} className='w-full h-12 mt-1 text-lg'>
          <Plus className='mr-1' /> New Chat Server
        </Button>
      </Link>
      {selectedServer && (
        <Link href={`/chatservers/${selectedServer}/newchannel`} className='w-full'>
          <Button variant={'outline'} className='w-full h-12 mt-1 text-lg'>
            <Plus className='mr-1' /> New Chat Channel
          </Button>
        </Link>
      )}

      <div className='border flex flex-col h-full w-full mb-4 rounded-sm'>
        <span className='w-full pl-8 mt-8 text-xl underline text-purple-400'>Channels</span>
        {channels.map(channel => (
          <Link key={channel.id} href={`/chatservers/${channel.serverId}/${channel.id}`} className='w-full pl-6 text-start text-2xl hover:dark:bg-neutral-800 hover:bg-neutral-100'>
            # {channel.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MessagesLayout;
