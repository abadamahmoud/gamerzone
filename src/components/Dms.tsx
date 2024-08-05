import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/ui/carousel';

const Dms = () => {
  const { user, loading } = useUser();
  const [channels, setChannels] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchChannels = async () => {
        try {
          const response = await fetch(`/api/channels?userId=${user?.id}`);
          const data = await response.json();
          console.log(data);
          setChannels(data);

          if (data.length > 0) {
            router.push(`/dms/${data[0].id}`);
          }
        } catch (err) {
          setError('Failed to fetch channels');
        }
      };
      fetchChannels();
    }
  }, [user]);

  // display channels in scroll area , each channel is a link
  return (
    <div className="md:w-2/5 px-4 items-center justify-start md:justify-start md:flex-col flex-row-reverse md:gap-2 gap-14  flex h-16 md:h-full w-full lg:w-1/4">
      <Link href={`/dms/newchannel`} className="md:w-full  w-auto">
        <Button variant={'outline'} className="w-full hidden md:flex h-12 text-lg">
          <Plus className="mr-1" /> New Discussion
        </Button>
        <Button variant={'outline'} className="flex md:hidden h-12 w-12 text-lg">
          <Plus />
        </Button>
      </Link>
      <div className="border hidden p-2  flex-col md:flex gap-2  h-full w-full mb-2 rounded-sm">
        {error && <p className="text-red-500">{error}</p>}
        {channels.length > 0 ? (
          channels.map((channel) => (
            <Link
              key={channel.id}
              href={`/dms/${channel.id}`}
              className="w-full p-2 justify-start flex gap-2  items-start text-2xl h-fit hover:dark:bg-neutral-800 md:hover:bg-neutral-100"
            >
              <img src={channel.image} className='h-12 md:h-8 md:w-8 w-12 rounded-full object-cover'/>
              <p className='md:inline hidden'>{channel.name}</p>
               
            </Link>
          ))
        ) : (
          <p className="text-center text-lg">No channels found</p>
        )}
      </div>
      <Carousel className="w-full ml-12 md:hidden ">
      <CarouselContent className="-ml-1">
        {channels.map((channel) => (
          <CarouselItem key={channel.id} className="pl-1 basis-1/6">
            <Link
              key={channel.id}
              href={`/dms/${channel.id}`}
              className="  md:w-full w-fit justify-start flex md:gap-2  items-start text-2xl  md:hover:dark:bg-neutral-800 md:hover:bg-neutral-100"
            >
              <img src={channel.image} className='h-12 md:h-8 md:w-8 w-12 rounded-full object-cover'/>
              <p className='md:inline hidden'>{channel.name}</p>
               
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  );
};

export default Dms;
