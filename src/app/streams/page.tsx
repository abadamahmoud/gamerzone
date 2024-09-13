"use client"
import StreamCard from '@/components/StreamCard';
import { useEffect, useState } from 'react';
import { Stream } from '@/types';

const StreamsPage = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetch('/api/streams');
        if (!response.ok) {
          throw new Error('Failed to fetch streams');
        }
        const data: Stream[] = await response.json();
        setStreams(data);
      } catch (err) {
        setError('Failed to fetch Twitch streams');
        console.error(err);
      }
    };

    fetchStreams();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <>
      <main className='flex flex-wrap gap-6 p-2 w-full md:p-4 mt-16 sm:flex-col md:flex-row justify-center'>
        {streams.map(item => <StreamCard stream={item} key={item.user_login} />)}
      </main>
      <h2>That&apos;s All For You Today!</h2>
    </>
  );
};

export default StreamsPage;
