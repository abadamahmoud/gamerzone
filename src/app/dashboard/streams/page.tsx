

import StreamCard from '@/components/StreamCard';

import { fetchTwitchStreams } from '@/lib/twitchFeed';


const clientId = process.env.TWITCH_CLIENT_ID || '';
const accessToken = process.env.TWITCH_ACCESS_TOKEN || '';


const StreamsPage = async () => {


  const content = await fetchTwitchStreams(clientId, accessToken, 100);
  
  return (
    <>
    <main className='flex flex-wrap gap-6 p-2 md:p-4 md:mt-14 justify-center'>
      {content.map((item, index) => <StreamCard key={index} stream={item}/>)}
     
    </main> 
    <h2>That 's All For You Today :)</h2>
    </>
  );
};

export default StreamsPage;





