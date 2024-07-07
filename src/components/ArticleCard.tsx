"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Article } from '@/lib/types'; 
import { EllipsisVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


interface ArticleProps {
  article: Article;
}


const ArticleCard: React.FC<ArticleProps> = ({ article }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex  flex-col  md:min-w-[380px] w-full flex-1 md:max-w-[800px] h-[400px] border rounded shadow-md">
       <Image
        src={article.thumbnail}
        alt={article.title}
        width={400}
        height={150}
        className="rounded-sm mb-2 object-cover h-full w-full"
      />
      
      <div className='flex-col  gap-2 p-2 flex '>
      <h2 className="text-lg ml-1 font-semibold">
       {article.title}
      </h2>
      <div className="flex gap-2  w-full items-center">
        <Avatar>
          <AvatarImage src={article.sourceAvatar} />
          <AvatarFallback>{article.source.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col text-sm '>

          <span className="font-bold text-gray-500">{article.source}</span>
          <span className=" text-gray-500">
          {article.pubDate} • {article.reads} reads
          </span>
        </div>
        <EllipsisVertical className="ml-auto hover:cursor-pointer"/>
      </div>
      </div>

      
      

     
      
    </div>
  );
};

export default ArticleCard;
