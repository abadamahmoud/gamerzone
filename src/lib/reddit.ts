// lib/reddit.ts
import axios from 'axios';

interface RedditPost {
  id: string;
  title: string;
  permalink: string;
  url: string;
}

const REDDIT_API_URL = 'https://www.reddit.com/r/gaming/top/.json?limit=10';

export const fetchRedditTopPosts = async (): Promise<RedditPost[]> => {
  try {
    const { data } = await axios.get(REDDIT_API_URL);
    return data.data.children.map((post: any) => post.data);
  } catch (error) {
    console.error('Error fetching top posts from Reddit:', error);
    return [];
  }
};
