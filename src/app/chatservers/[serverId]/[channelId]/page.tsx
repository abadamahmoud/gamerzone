// className='pt-16 px-3 bg-blue-900 w-full'>
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TopBar from '@/components/TopMessgesBar';
import MessageBody from '@/components/DiscussionBody';
import MessageInput from '@/components/MessageInput';
import { useUser } from '@/context/UserContext';
import useSocket from '@/context/useSocket';


const ChannelPage = () => {
  const { serverId, channelId } = useParams();
  const { user } = useUser();
  const socket = useSocket('http://localhost:4000'); 
  const [channel, setChannel] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const channelResponse = await fetch(`/api/channels/${channelId}`);
        const channelData = await channelResponse.json();
        setChannel(channelData);

        const messagesResponse = await fetch(`/api/messages?channelId=${channelId}`);
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchChannelData();
  }, [channelId]);

  useEffect(() => {
    if (!socket) return;
    socket.emit('joinChannel', channelId);

    socket.on('newMessage', (newMessage) => {
      try {
        fetch(`/api/messages?channelId=${channelId}`).then(response => response.json()).then(messages => setMessages(messages))
      
      } catch (error) {
        
      }
    });
    socket.on('channelDeleted', () => {
      router.push(`/chatservers/${serverId}`);
     
    });

    return () => {
      socket.emit('leaveChannel', channelId);
      socket.off('newMessage');
      socket.off('channelDeleted');

    };
    
  }, [socket, channelId]);

  const handleSendMessage = async (messageContent: string) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId, content: messageContent, senderId: user?.id }),
      });

      const newMessage = await response.json();

      // Emit the message to Socket.IO server
      if (socket) {
        socket.emit('sendMessage', { ...newMessage, channelId });
      }
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const onChannelDelete = async (channelId: string) => {
    try {
      const response = await fetch(`/api/channels/${channelId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete channel');
      }
  
      const result = await response.json();

     

      // Emit an event to update the UI via Socket.IO
      if (socket) {

        socket.emit('channelDeleted' );
      }


    return result;


    } catch (error) {
      console.error('Error deleting channel:', error);
    }
   
  };

  const onChannelLeave = (channelId: string) => {
    // Your logic for leaving the channel
    console.log(`Left channel ${channelId}`);
  };


  if (error) return <div>{error}</div>;

  return (
    <div className="flex pt-16  px-3 flex-col h-full w-full">
      {channel && <TopBar channel={channel} onChannelDelete={onChannelDelete} 
      onChannelLeave={onChannelLeave} />}
      <MessageBody messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChannelPage;
