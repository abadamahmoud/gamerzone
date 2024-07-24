"use client";
import React, { useEffect, useState } from 'react';
import { useSocket } from '@/lib/useSocket';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';
import MessagesPanel from '@/components/MessagesPanel';
import MessagesLayout from '@/components/MessagesLayout';

interface Message {
  id: string;
  content: string;
  createdAt: string; // Updated to match the schema
  senderId: string;
  channelId: string;
  type: string; // "text", "file", "audio", "video"
}

const MessagesPage = () => {
  /*
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatRoomId, setChatRoomId] = useState<string>(''); // Set your chat room ID here
  const [userId, setUserId] = useState<string>(''); // Set the logged-in user's ID here

  useEffect(() => {
    if (chatRoomId) {
      socket.emit('joinChannel', chatRoomId); // Ensure this matches your server-side implementation

      socket.on('newMessage', (message: Message) => { // Ensure this matches your server-side implementation
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off('newMessage'); // Ensure this matches your server-side implementation
      };
    }
  }, [chatRoomId, socket]);

  const handleSendMessage = (content: string) => {
    if (chatRoomId && userId) {
      const message: Message = {
        id: '', // Generate or obtain an ID
        content,
        createdAt: new Date().toISOString(), // Use current time as a placeholder
        senderId: userId,
        channelId: chatRoomId,
        type: 'text' // Specify message type
      };
      socket.emit('sendMessage', message);
      setMessages((prevMessages) => [...prevMessages, message]); // Optionally add message to local state
    }
  };*/

  return (
    <div className="  w-full pt-14  h-screen">
      this is messages content area
    </div>


);
};

export default MessagesPage;
