import { Images, Mic, Send, Smile } from 'lucide-react';
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
    <div className="flex items-center mr-2 md:mb-4 mb-20 rounded-sm justify-between dark:bg-neutral-900 bg-neutral-200 p-2 gap-2 dark:text-white">
      <Smile className='hover:cursor-pointer'/>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 dark:bg-neutral-900 rounded bg-neutral-200 dark:text-white focus:outline-none"
        placeholder="Type a message..."
      />
      <Images className='hover:cursor-pointer'/>
      {message.trim().length > 0 ? 
      <Send onClick={handleSendMessage } className='hover:cursor-pointer'/>:
      <Mic className='hover:cursor-pointer'/>}
      
    </div>
  );
};

export default MessageInput;
