"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Stream } from '@/types'; 
import { EllipsisVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';



interface CardProps {
  stream: Stream;
}


const StreamCard: React.FC<CardProps> =  ({ stream }) => {
  const [timeRunning, setTimeRunning] = useState('');
  useEffect(() => {
    const startDate = new Date(stream.started_at);
    const now = new Date();
    
    // Calculate the difference in milliseconds
    const diffInMs = now.getTime() - startDate.getTime();
    
    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    // Convert milliseconds to hours
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    
    // Convert milliseconds to minutes
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    
    // Calculate hours and minutes remaining after extracting days
    const hours = diffInHours % 24;
    const minutes = diffInMinutes % 60;
    
    // Format the time running string
    let timeString = '';

    if (diffInDays > 0) {
      timeString += `${diffInDays} days `;
    }

    if (hours > 0) { // Include hours if there are days or if hours are greater than 0
      timeString += `${hours} hours `;
    }

    if (minutes > 0 ) { // Include minutes if there are days, hours, or minutes are greater than 0
      timeString += `${minutes} minutes`;
    }

    setTimeRunning(timeString.trim()); // Remove any trailing spaces
  }, [stream.started_at]);





  if  (stream.type !== "live") return;
 

 
  return (
    <Link className="flex flex-col min-w-[380px] w-full flex-1 md:max-w-[800px] h-[400px] border rounded shadow-md" href={{ pathname: `/streams/${stream.user_login}`,/*query: { link: item.user_login}*/ }}>
       
      


    <Image
      src={stream.thumbnail_url.replace("-{width}x{height}", "")}
      alt={stream.title}
      width={400}
      height={150}
      className="h-full w-full object-cover"
    />
  
  

      
      <div className='flex-col  gap-2 p-2 flex '>
      <h2 className="text-lg ml-1 font-semibold">
       {stream.title}
      </h2>
      <div className="flex gap-2  w-full items-center">
        <Avatar>
          <AvatarImage src={stream.profile_image_url} />
          <AvatarFallback>{stream.user_name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col text-sm '>

          <span className="font-bold text-gray-500">{stream.user_name}</span>
          <span className=" text-gray-500">
          {timeRunning} • {stream.viewer_count} Watching
          </span>
        </div>
        <EllipsisVertical className="ml-auto hover:cursor-pointer"/>
      </div>
      </div>

      
      

     
      
    </Link>
  );
};

export default StreamCard;
