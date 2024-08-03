import { FC, useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center p-4 bg-gray-800 text-white">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 mr-2 rounded bg-gray-700 text-white"
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-600 rounded">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
