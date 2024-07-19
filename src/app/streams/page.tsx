

import StreamCard from '@/components/StreamCard';

import { fetchTwitchStreams } from '@/lib/twitchFeed';
import Link from 'next/link';


const clientId = process.env.TWITCH_CLIENT_ID! || '';
const accessToken = process.env.TWITCH_ACCESS_TOKEN! || '';


const StreamsPage = async () => {


  const content = await fetchTwitchStreams(clientId, accessToken, 100);

  return (
    <>
    <main className='flex flex-wrap  gap-6 p-2 w-full md:p-4 md:mt-14 sm:flex-col md:flex-row justify-center'>
      {content.map((item, index) => 
      <Link key={index} href={{ pathname: `/streams/${item.user_login}`,/*query: { link: item.user_login}*/ }}>
      <StreamCard  stream={item}/>
     </Link>)}
    </main> 
    <h2>That 's All For You Today :)</h2>
    </>
  );
};

export default StreamsPage;





