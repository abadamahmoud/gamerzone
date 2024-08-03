import { FC } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { EllipsisVertical, Phone, Settings, Video } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Channel } from '@/types';

interface TopBarProps {
  channel: Channel
}

const TopBar: FC<TopBarProps> = ({ channel }) => {
  const {user }= useUser();
  

  const deleteChannel = async (channelId: string) => {
    try {
      const response = await fetch(`/api/channels/${channelId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Channel deleted successfully, handle UI update
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error deleting channel:', error);
    }
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
          <DropdownMenuItem>Leave Channel</DropdownMenuItem>
          {user && user.id === channel.creatorId && <DropdownMenuItem className='text-red-500' onClick={()=>deleteChannel(channel.id)}>Delete Channel</DropdownMenuItem>}
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
)};

export default TopBar;
