"use client"
import TwitchEmbed from '@/components/TwitchEmbed'; // Adjust the path as necessary

import { useParams, useSearchParams } from 'next/navigation';

const StreamPage = () => {
  const Params = useParams();
  const channelName = Params.slug as string

  


  return (
    <div className="container mx-auto mt-14 p-4">
      
            <a href="/streams"  rel="noopener noreferrer"        className="text-blue-500 mb-8 block border w-fit p-2 mt-2">
              Back to Streams
            
            </a>
          
          

      {channelName ? (
        <TwitchEmbed channel={channelName} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StreamPage;
