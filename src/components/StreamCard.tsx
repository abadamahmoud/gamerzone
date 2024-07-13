"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Article, Stream } from '@/lib/types'; 
import { EllipsisVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


interface ArticleProps {
  stream: Stream;
}


const StreamCard: React.FC<ArticleProps> = ({ stream }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-w-[380px] w-full flex-1 md:max-w-[800px] h-[400px] border rounded shadow-md">
       
       
       <Image
        src={stream.thumbnail_url.replace("-{width}x{height}", "")}
        alt={stream.title}
        width={400}
        height={150}
        className="rounded-sm hover:opacity-50 mb-2 object-cover h-full w-full"
      />
      
      <div className='flex-col  gap-2 p-2 flex '>
      <h2 className="text-lg ml-1 font-semibold">
       {stream.title}
      </h2>
      <div className="flex gap-2  w-full items-center">
        <Avatar>
          <AvatarImage src={"rlqgm"} />
          <AvatarFallback>{stream.user_name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col text-sm '>

          <span className="font-bold text-gray-500">{stream.user_name}</span>
          <span className=" text-gray-500">
          {stream.started_at} • {stream.viewer_count} Watching
          </span>
        </div>
        <EllipsisVertical className="ml-auto hover:cursor-pointer"/>
      </div>
      </div>

      
      

     
      
    </div>
  );
};

export default StreamCard;
