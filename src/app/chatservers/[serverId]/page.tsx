"use client"
import { useEffect, useState } from 'react';

const ServerPage = ({ params }) => {
  const { serverId } = params;
  const [server, setServer] = useState<any>(null);
  const [channels, setChannels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (serverId) {
      // Fetch server details and channels
      const fetchServerData = async () => {
        try {
          const serverResponse = await fetch(`/api/servers/${serverId}`);
          const serverData = await serverResponse.json();
          setServer(serverData);

          const channelsResponse = await fetch(`/api/channels?serverId=${serverId}`);
          const channelsData = await channelsResponse.json();
          setChannels(channelsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchServerData();
    }
  }, [serverId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='pt-24 mx-auto'>
      <h1>Server: {server?.name}</h1>
      <ul>
        {channels.map(channel => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServerPage;
