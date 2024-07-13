"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Article } from '@/lib/types'; 
import { EllipsisVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {motion} from "framer-motion"

interface ArticleProps {
  article: Article;
}


const ArticleCard: React.FC<ArticleProps> = ({ article }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-w-[380px] w-full flex-1 md:max-w-[800px] h-[400px] border rounded shadow-md">
        <motion.div
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
        className="rounded-sm mb-2 object-cover h-full w-full"
      >
        <Image
          src={article.thumbnail}
          alt={article.title}
          width={400}
          height={150}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Add two buttons that will pop up on hover */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute z-50 inset-0 flex flex-col items-center justify-center"
      >
        <motion.button
          initial={{ x: -100, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white bg-opacity-75 hover:bg-opacity-100 p-2 rounded shadow mb-2"
        >
          Button 1
        </motion.button>
        <motion.button
          initial={{ x: 100, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white bg-opacity-75 hover:bg-opacity-100 p-2 rounded shadow"
        >
          Button 2
        </motion.button>
      </motion.div>
      
      <div className='flex-col  gap-2 p-2 flex '>
      <h2 className="text-lg ml-1 font-semibold">
       {article.title}
      </h2>
      <div className="flex gap-2  w-full items-center">
        <Avatar>
          <AvatarImage src={article.sourceAvatar} />
          <AvatarFallback>{article.sourceName.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col text-sm '>

          <span className="font-bold text-gray-500">{article.sourceName}</span>
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
