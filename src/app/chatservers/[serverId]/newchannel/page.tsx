"use client"
import { useParams } from 'next/navigation';
import CreateChannelForm from '@/components/CreateChannelForm';

const NewChannelPage = () => {
  const { serverId } = useParams();

  if (!serverId) {
    return <div className='pt-14 w-full flex flex-col justify-center items-center  h-screen'>
    <h2>Loading...</h2>
   
</div>
  }

  return( 
  <div className='pt-14 w-full flex flex-col justify-center items-center  h-screen'>
      <h2>Create a new chat channel</h2>
      <CreateChannelForm serverId={serverId as string} />
  </div>
)};

export default NewChannelPage;
