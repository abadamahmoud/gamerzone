"use client";

import { useState, useEffect, useRef } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/types';
import { Skeleton } from '@/components/ui/ui/skeleton';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  let currentIndex = array.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const limit = 3;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  

  // Function to fetch articles
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/fetcharticles?startIndex=${page * limit}&limit=${limit}`);
      if (!res.ok) throw new Error('Failed to fetch articles');
      const newArticles: Article[] = await res.json();

       // Shuffle the new articles before adding them
       const shuffledArticles = shuffleArray(newArticles);

      // Update articles state
      setArticles((prev) => {
        const filteredArticles = shuffledArticles.filter(newArticle => !prev.some(article => article.title === newArticle.title));
        return  [...prev, ...filteredArticles];
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles when the page number changes
  useEffect(() => {
    fetchArticles();
  }, [page, fetchArticles]);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      });
    }
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current && observerRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
    };
  }, [loading]);

  // Number of skeletons to show based on screen size
  // Number of skeletons to show based on screen size
  const skeletonCount = {
    sm: 2,
    md: 4,
    lg: 4,
    xl: 8,
  };
  // Function to generate an array of skeletons based on the screen size
  const renderSkeletons = () => {
    const count = skeletonCount[
      window.innerWidth >= 1280 ? "xl" :
      window.innerWidth >= 1024 ? "lg" :
      window.innerWidth >= 768 ? "md" : "sm"
    ];
    return Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex flex-col p-2 space-y-3 z-auto min-w-[380px] w-full flex-1 md:max-w-[800px] h-[400px] border rounded shadow-md">
        <Skeleton className="h-[280px] w-full rounded-sm bg-neutral-200 dark:bg-muted" />
        <div className="space-y-2">
          <Skeleton className="h-full w-full p-2 bg-neutral-200 dark:bg-muted" />
          <Skeleton className="h-6 w-1/2 p-2 bg-neutral-200 dark:bg-muted" />
        </div>
      </div>
    ));
  };

  return (
    <>
      <main className='flex flex-wrap gap-6 p-2 w-full md:p-4 mt-16 sm:flex-col md:flex-row justify-center'>
        {articles.map((item, index) => (
          <ArticleCard article={item} key={index} />
        ))}
      </main>
      {loading && (
        <div className="flex flex-wrap justify-center gap-6">
          {renderSkeletons()}
        </div>
      )}
      <div ref={loadMoreRef} className="w-full h-16" />
      {/*!loading && articles.length === 0 && <h2>No articles found.</h2>*/}
      {!loading && articles.length > 0 && <h2>That&apos;s All For You Today :)</h2>}
    </>
  );
};

export default HomePage;
