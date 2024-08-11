import ArticleCard from '@/components/ArticleCard';
import { aggregateRSSFeed } from '@/lib/rssFeed';

const HomePage = async () => {
  const content = await aggregateRSSFeed();
  return (
    <>
    <main className='flex flex-wrap  gap-6 p-2 w-full md:p-4 mt-14 sm:flex-col md:flex-row justify-center'>
      {content.map((item, index) => 
       <ArticleCard  article={item}/>
      )}    
    </main> 
    <h2>That 's All For You Today :)</h2>
    </>
  );
};
export default HomePage;
