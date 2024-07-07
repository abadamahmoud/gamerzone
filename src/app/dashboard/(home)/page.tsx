
// app/dashboard/(home)/page.tsx
import ArticleCard from '@/components/ArticleCard';
import { aggregateRSSFeed } from '@/lib/rssFeed';



const DashboardPage = async () => {
  const content = await aggregateRSSFeed();
  return (
    <main className='flex flex-wrap gap-6 p-2 md:p-4 md:mt-14 justify-center'>
      {content.map(item => <ArticleCard article={item}/>)}
      <h2>That 's All For You Today :)</h2>
    </main>
  );
};

export default DashboardPage;





















/*/import Posts from "@/components/Posts";
//import { PostsSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";

function DashboardPage() {
  return (
    <main className="flex w-full flex-grow">
      <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
        <Suspense fallback={<PostsSkeleton />}>
          <Posts />
        </Suspense>
      </div>
    </main>
  );
}

export default DashboardPage;*/
