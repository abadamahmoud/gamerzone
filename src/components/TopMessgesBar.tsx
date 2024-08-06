import { FC } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { EllipsisVertical, Phone, Video } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Channel } from '@/types';
import { usePathname } from 'next/navigation';

interface TopBarProps {
  channel: Channel;
  onChannelDelete: ((channelId: string) => void) | null ;
  onChannelLeave: ((channelId: string) => void) | null;
  onDiscussionDelete: ((channelId: string) => void) | null;
}
const TopBar: FC<TopBarProps> = ({ channel,  onChannelDelete, onChannelLeave, onDiscussionDelete }) => {
  const {user }= useUser();
  const pathname = usePathname();
  const isOnChatServers = pathname.search("/chatservers/") !== -1;



  const handleChannelDelete = () => {
    onChannelDelete && onChannelDelete(channel.id);
  };
  const handleDiscussionDelete = () => {
    onDiscussionDelete && onDiscussionDelete(channel.id);
  };

  const handleChannelLeave = () => {
    onChannelLeave && onChannelLeave(channel.id);
  };

  return (<div className="flex items-center justify-between p-4 dark:bg-neutral-900 bg-neutral-100 dark:text-white">
    <h2 className="text-xl">{channel.name}</h2>
    <div className="flex items-center space-x-4">
      <Phone className='hover:cursor-pointer'/>
      <Video className='hover:cursor-pointer'/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          
          <EllipsisVertical className='hover:cursor-pointer'/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {isOnChatServers && <>
          <DropdownMenuItem>Add Members</DropdownMenuItem>
          <DropdownMenuItem onClick={handleChannelLeave}>Leave Channel</DropdownMenuItem>
          {user && user.id === channel.creatorId && <DropdownMenuItem className='text-red-500'  onClick={handleChannelDelete}>Delete Channel</DropdownMenuItem>}
          </>}
          {!isOnChatServers && <DropdownMenuItem className='text-red-500'  onClick={handleDiscussionDelete}>Delete Discussion</DropdownMenuItem>}
          
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
)};

export default TopBar;
