"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Article } from '@/types'; 
import { EllipsisVertical, ExternalLink, WandSparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {motion} from "framer-motion"
import Link from "next/link";
interface ArticleProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleProps> = ({ article }) => {
  const [reads, setReads] = useState(0);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setReads(Math.floor(Math.random() * 2000) + 250);
    const date = new Date(article.pubDate);
    setFormattedDate(date.toLocaleDateString());
  }, [article.pubDate]);

  return (
    <Link 
      className="flex z-auto  flex-col min-w-[380px] w-full flex-1 md:max-w-[800px] h-[400px] border rounded shadow-md" 
      href={{ pathname: `/articles/${article.slug}`, query: { link: article.link } }}
    >
      <Image
        src={article.thumbnail}
        alt={article.title}
        width={400}
        height={150}
        className="h-full hover:opacity-50 w-full object-cover"
      />
      
      <div className='flex-col gap-2 p-2 flex '>
        <h2 className="text-lg ml-1 font-semibold">
          {article.title}
        </h2>
        <div className="flex gap-2 w-full items-center">
          <Avatar>
            <AvatarImage src={article.sourceAvatar} />
            <AvatarFallback>{article.sourceName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col text-sm '>
            <span className="font-bold text-gray-500">{article.sourceName}</span>
            <span className="text-gray-500">
              {formattedDate} • {reads} reads
            </span>
          </div>
          <EllipsisVertical className="ml-auto hover:cursor-pointer"/>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
