/*"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import useSocket from '@/context/useSocket';

function MessagesLayout() {
  const pathname = usePathname();
  const socket = useSocket('http://localhost:4000');
  const { user, loading } = useUser();
  const [selectedServer, setSelectedServer] = useState<string | undefined>(undefined);
  const [servers, setServers] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  // Check for query parameters to force data refetch
  useEffect(() => {
    const { searchParams } = new URL(window.location.href);

    if (searchParams.has('updated')) {
      // Force refetch of data
      fetchData();
      searchParams.delete('updated'); // Clean up query parameter
      window.history.replaceState(null, '', window.location.pathname); // Remove query parameter from URL
    } else {
      fetchData();
    }

    if (socket) {
        socket.on('updateServers', async () => {
          const response = await fetch(`/api/servers?userId=${user?.id}`);
          const data = await response.json();
          setServers(data);
        });

        socket.on('updateChannels', async () => {
          const response = await fetch(`/api/channels?userId=${user?.id}`);
          const data = await response.json();
          setChannels(data);
        });

        return () => {
          socket.off('updateServers');
          socket.off('updateChannels');
        };
      }
  }, [user]);




  const fetchData = () => {
    if (user) {
      // Fetch servers and channels
      fetch(`/api/servers?userId=${user.id}`)
        .then(response => response.json())
        .then(data => {
          setServers(data.servers);
          setChannels(data.channels);
          if (data.servers.length > 0) {
            setSelectedServer(data.servers[0].id);
          }
        })
        .catch(err => setError('Failed to fetch servers and channels: ' + err));
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Please log in to view your messages.</div>;
  }

  return (
    <div className='flex pt-16 px-2 flex-col items-start gap-2 w-1/4 min-w-72 lg:w-1/4 h-full'>
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

      <Select value={selectedServer} onValueChange={setSelectedServer}>
        <SelectTrigger className="w-full text-lg hover:dark:bg-neutral-800 hover:bg-neutral-100 h-12">
          <SelectValue placeholder={<div className='flex gap-2 items-center'>
            {servers[0] && (
              <>
                <img src={servers[0].image} alt={servers[0].name} className='w-10 h-10 object-cover rounded-full' />
                <span>{servers[0].name}</span>
              </>
            )}
          </div>} />
        </SelectTrigger>
        <SelectContent>
          {servers.map(server => (
            <SelectItem key={server.id} value={server.id}>
              <div className='flex gap-2 text-lg items-center'>
                <img src={server.image} alt={server.name} className='w-10 h-10 object-cover rounded-full' />
                <span>{server.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
}

export default MessagesLayout;*/
import React, { useState, useEffect } from 'react';
import useSocket from '@/context/useSocket';
import { useUser } from '@/context/UserContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const MessagesLayout = () => {
  const { user, loading } = useUser();
  const socket = useSocket('http://localhost:4000');
  const [servers, setServers] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [selectedServer, setSelectedServer] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const serverResponse = await fetch(`/api/servers?userId=${user.id}`);
          const serverData = await serverResponse.json();
          setServers(serverData);
          if (serverData.length > 0) {
            setSelectedServer(serverData[0].id);
          }

          const channelResponse = await fetch(`/api/channels?userId=${user.id}`);
          const channelData = await channelResponse.json();
          setChannels(channelData);
        } catch (err) {
          setError('Failed to fetch data');
        }
      };

      fetchData();

      if (socket) {
        socket.on('updateServers', async () => {
          const response = await fetch(`/api/servers?userId=${user.id}`);
          const data = await response.json();
          setServers(data);
        });

        socket.on('updateChannels', async () => {
          const response = await fetch(`/api/channels?userId=${user.id}`);
          const data = await response.json();
          setChannels(data);
        });

        return () => {
          socket.off('updateServers');
          socket.off('updateChannels');
        };
      }
    }
  }, [user, socket]);

  const handleDelete = async (type: 'server' | 'channel', id: string) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        const response = await fetch(`/api/${type}s/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setServers(prev => prev.filter(s => s.id !== id));
          setChannels(prev => prev.filter(c => c.id !== id));
          alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
        } else {
          alert('Failed to delete');
        }
      } catch (error) {
        console.error('Error deleting:', error);
        alert('An error occurred while deleting');
      }
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>Please log in to view your messages.</div>;

  return (
    <div className='flex pt-16 px-2 flex-col items-start gap-2 w-1/4 min-w-72 lg:w-1/4 h-full'>
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

      <Select value={selectedServer} onValueChange={setSelectedServer}>
        <SelectTrigger className="w-full text-lg hover:dark:bg-neutral-800 hover:bg-neutral-100 h-12">
          <SelectValue placeholder={<div className='flex gap-2 items-center'>
            {servers[0] && (
              <>
                <img src={servers[0].image} alt={servers[0].name} className='w-10 h-10 object-cover rounded-full' />
                <span>{servers[0].name}</span>
              </>
            )}
          </div>} />
        </SelectTrigger>
        <SelectContent>
          {servers.map(server => (
            <SelectItem key={server.id} value={server.id}>
              <div className='flex gap-2 text-lg items-center'>
                <img src={server.image} alt={server.name} className='w-10 h-10 object-cover rounded-full' />
                <span>{server.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className='border flex flex-col h-full w-full mb-4 rounded-sm'>
        <span className='w-full pl-8 mt-8 text-xl underline text-purple-400'>Channels </span>
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
