// components/MessageList.tsx
import React from 'react';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => (
  <div className="message-list">
    {messages.map((message) => (
      <div key={message.id} className="message">
        <p>{message.content}</p>
        <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
      </div>
    ))}
  </div>
);

export default MessageList;
