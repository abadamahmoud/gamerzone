import { FC } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface TopBarProps {
  channel: {
    name: string;
  };
}

const TopBar: FC<TopBarProps> = ({ channel }) => (
  <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
    <h2 className="text-xl">{channel.name}</h2>
    <div className="flex items-center space-x-4">
      <button>📞</button>
      <button>🎥</button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>⚙️</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Invite</DropdownMenuItem>
          <DropdownMenuItem>Leave Channel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);

export default TopBar;
