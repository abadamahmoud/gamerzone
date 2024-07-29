"use client"
import { useParams } from 'next/navigation';
// Import your components for viewing and sending messages

const ChannelPage = () => {
  const { serverId, channelId } = useParams();

  if (!serverId || !channelId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Add your components for viewing and sending messages */}
      <h1>Channel {channelId} in Server {serverId}</h1>
      {/* Example: <MessageList serverId={serverId as string} channelId={channelId as string} /> */}
    </div>
  );
};

export default ChannelPage;
