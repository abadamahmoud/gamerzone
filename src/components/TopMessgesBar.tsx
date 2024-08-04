import { FC } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { EllipsisVertical, Phone, Video } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Channel } from '@/types';

interface TopBarProps {
  channel: Channel;
  onChannelDelete: (channelId: string) => void;
  onChannelLeave: (channelId: string) => void;
}
const TopBar: FC<TopBarProps> = ({ channel,  onChannelDelete, onChannelLeave }) => {
  const {user }= useUser();

  const handleChannelDelete = () => {
    onChannelDelete(channel.id);
  };

  const handleChannelLeave = () => {
    onChannelLeave(channel.id);
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
          <DropdownMenuItem>Add Members</DropdownMenuItem>
          <DropdownMenuItem onClick={handleChannelLeave}>Leave Channel</DropdownMenuItem>
          {user && user.id === channel.creatorId && <DropdownMenuItem className='text-red-500'  onClick={handleChannelDelete}>Delete Channel</DropdownMenuItem>}
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
)};

export default TopBar;
