
import axios from 'axios';

interface HackerNewsItem {
  id: number;
  title: string;
  url: string;
  by: string;
  score: number;
}

const HN_API_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchTopStories = async (): Promise<HackerNewsItem[]> => {
  try {
    const { data: storyIds } = await axios.get<number[]>(`${HN_API_URL}/topstories.json`);
    const stories = await Promise.all(
      storyIds.slice(0, 10).map(async (id) => {
        const { data: story } = await axios.get<HackerNewsItem>(`${HN_API_URL}/item/${id}.json`);
        return story;
      })
    );
    return stories;
  } catch (error) {
    console.error('Error fetching top stories from Hacker News:', error);
    return [];
  }
};
