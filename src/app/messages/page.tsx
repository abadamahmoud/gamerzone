// pages/messages.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useSocket } from '@/lib/useSocket';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
}

const MessagesPage = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]); // Specify type here
  const [chatRoomId, setChatRoomId] = useState<string>(''); // Set your chat room ID
  const [userId, setUserId] = useState<string>(''); // Set the logged-in user's ID

  useEffect(() => {
    socket.emit('joinRoom', chatRoomId);

    socket.on('receiveMessage', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [chatRoomId, socket]);

  const handleSendMessage = (content: string) => {
    socket.emit('sendMessage', { chatRoomId, senderId: userId, content });
  };

  return (
    <div className="messages-page mt-40 ml-52">
      <MessageList messages={messages} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default MessagesPage;
