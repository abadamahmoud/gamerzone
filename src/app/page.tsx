

import ArticleCard from '@/components/ArticleCard';
import { aggregateRSSFeed } from '@/lib/rssFeed';
import Link from 'next/link';



const DashboardPage = async () => {
  const content = await aggregateRSSFeed();
  
  return (
    <>
    <main className='flex flex-wrap  gap-6 p-2 w-full md:p-4 md:mt-14 sm:flex-col md:flex-row justify-center'>
      {content.map((item, index) => 
      <Link key={index} href={{ pathname: `/articles/${item.slug}`,query: { link: item.link} }}>
      
      
       <ArticleCard  article={item}/>
      </Link>
      )}
     
    </main> 
    <h2>That 's All For You Today :)</h2>
    </>
  );
};

export default DashboardPage;














