import React from 'react';

interface Message {
  id: string;
  content: string;
  createdAt: string; // Updated to match the schema
  senderId: string;
  channelId: string;
  type: string; // "text", "file", "audio", "video"
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => (
  <div className="message-list">
    {messages.map((message) => (
      <div key={message.id} className="message">
        <p>{message.content}</p>
        <span>{new Date(message.createdAt).toLocaleTimeString()}</span> {/* Use createdAt */}
      </div>
    ))}
  </div>
);

export default MessageList;
