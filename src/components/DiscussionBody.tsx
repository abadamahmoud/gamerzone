import { useUser } from '@/context/UserContext';
import { Message } from '@/types';
import { FC } from 'react';

interface DiscussionBodyProps {
  messages: Message[];
}

const DiscussionBody: FC<DiscussionBodyProps> = ({ messages }) => {
  const {user} = useUser();
 
  return  <div className="flex-1 overflow-y-auto  p-3">
  {messages.length > 0 &&
    messages.map((message, index) => {
      const isSameSenderAsPrevious = index > 0 && messages[index - 1].senderId === message.senderId;
      const isSameSenderAsNext = index < messages.length -1  && messages[index + 1].senderId === message.senderId;
      return (
        <div
          key={message.id}
          className={`${isSameSenderAsPrevious ? "mt-0.5":"mt-2"} gap-2 w-3/5  flex ${
            user?.id === message.senderId ? 'ml-auto flex-row-reverse' : 'mr-auto flex-row'
          }`}
        >
          {!isSameSenderAsPrevious && user?.id !== message.senderId &&(
            <img
              src={message.sender.image as string}
              alt={message.sender.name as string}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div className="w-fit">
            <p
              className={`w-fit text-balance py-2 px-4 rounded-2xl ${
                 isSameSenderAsPrevious ? 
                  `${user?.id === message.senderId ? ` bg-rose-500 dark:bg-rose-800 rounded-se-sm ${isSameSenderAsNext && "rounded-ee-sm"}`:
                  `ml-12  bg-neutral-200 rounded-ss-sm ${isSameSenderAsNext && "rounded-es-sm"} dark:bg-neutral-900`}`:
                  `${user?.id === message.senderId ? `bg-rose-500 dark:bg-rose-800 ${isSameSenderAsNext && "rounded-ee-sm"}`:
                  `bg-neutral-200 dark:bg-neutral-900 ${isSameSenderAsNext && "rounded-es-sm"}`}` 
                }  `}
            >
              {message.content}
            </p>
            {/*message.image && <img src={message.image} alt="Sent file" className="mt-2" />*/}
          </div>
        </div>
      );
    })}
</div>
};

export default DiscussionBody;
