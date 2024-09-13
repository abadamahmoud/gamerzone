

import StreamCard from '@/components/StreamCard';

import { fetchTwitchStreams } from '@/lib/twitchFeed';
import Link from 'next/link';


const clientId = process.env.TWITCH_CLIENT_ID! || '';
const accessToken = process.env.TWITCH_ACCESS_TOKEN! || '';


const StreamsPage = async () => {


  const content = await fetchTwitchStreams(clientId, accessToken, 100);

  return (
    <>
    <main className='flex flex-wrap  gap-6 p-2 w-full md:p-4 mt-16 sm:flex-col md:flex-row justify-center'>
      {content.map( item => <StreamCard  stream={item} key={item.user_login}/>)}
    </main> 
    <h2>That &apos;s All For You Today!</h2>
    </>
  );
};

export default StreamsPage;





