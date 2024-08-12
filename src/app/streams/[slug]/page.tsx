"use client"
import TwitchEmbed from '@/components/TwitchEmbed'; // Adjust the path as necessary

import { useParams } from 'next/navigation';

const StreamPage = () => {
  const Params = useParams();
  const channelName = Params.slug as string

  


  return (
    <div className="h-screen w-full mx-auto sm:pb-20 md:pb-0 pt-[60px] ">
      
            {/*<Link href="/streams"  rel="noopener noreferrer"        className="text-blue-500 mb-2 block border w-fit p-2 ">
              Back to Streams
            
            </Link>*/}
          
          

      {channelName ? (
        <TwitchEmbed channel={channelName} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StreamPage;
