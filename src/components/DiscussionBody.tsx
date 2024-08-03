import { Message } from '@/types';
import { FC } from 'react';

interface DiscussionBodyProps {
  messages: Message[];
}

const DiscussionBody: FC<DiscussionBodyProps> = ({ messages }) => (
  <div className="flex-1 overflow-y-auto p-4">
    {messages.map((message) => (
      <div key={message.id} className="mb-4">
        <div className="flex items-center mb-2">
          <img src={message.sender.image as string} alt={message.sender.name as string} className="w-8 h-8 rounded-full mr-2" />
          <span>{message.sender.name}</span>
        </div>
        <div className="ml-10">
          <p>{message.content}</p>
          {/*message.image && <img src={message.image} alt="Sent file" className="mt-2" />*/}
        </div>
      </div>
    ))}
  </div>
);

export default DiscussionBody;
