"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { Article } from '@/lib/types'; 
import { EllipsisVertical, ExternalLink, WandSparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {motion} from "framer-motion"
import Link from "next/link";
interface ArticleProps {
  article: Article;
}


const ArticleCard: React.FC<ArticleProps> = ({ article }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-w-[380px] w-full flex-1 md:max-w-[800px] h-[400px] border rounded shadow-md">
        
        <motion.div
  className="relative h-full w-full"
  initial="initial"
  whileHover="hover"
  variants={{
    initial: { opacity: 1 },
    hover: { opacity: 1 },
  }}
>
  {/* Image container */}
  <motion.div
    className="h-full w-full"
    variants={{
      initial: { opacity: 1 },
      hover: { opacity: .5 },
    }}
    transition={{ duration: 0.3 }}
  >
    <Image
      src={article.thumbnail}
      alt={article.title}
      width={400}
      height={150}
      className="h-full w-full object-cover"
    />
  </motion.div>

  {/* Overlay that appears on hover */}
  <motion.div
    className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center gap-4 justify-center"
    variants={{
      initial: { opacity: 0 },
      hover: { opacity: 1 },
    }}
    transition={{ duration: 0.3 }}
  >
          <Link href={`/dashboard/articles/${article.title.replaceAll(" ", "-")}`} passHref 
          rel="noopener noreferrer">
        <motion.button
          className="bg-fuchsia-400 flex gap-2 items-center justify-center px-8 py-4 text-xl text-black bg-opacity-75 hover:bg-opacity-100  rounded shadow"
          variants={{
            initial: { x: -100, opacity: 0 },
            hover: { x: 0, opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        >
          Summarized with AI <WandSparkles/>
        </motion.button>
      </Link>
      <Link href={article.link} passHref target="_blank"
          rel="noopener noreferrer">
        <motion.button
          className="bg-white flex gap-2 items-center justify-center px-8 py-4 text-xl text-black bg-opacity-75 hover:bg-opacity-100  rounded shadow"
          variants={{
            initial: { x: 100, opacity: 0 },
            hover: { x: 0, opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        >
          Read original article <ExternalLink/>
          </motion.button>
      </Link>
    </motion.div>
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
