export interface Article {
    title: string;
    link: string;
    sourceAvatar: string;
    thumbnail: string;
    pubDate: string;
    reads: number;
    sourceName: string;
    slug: string;
  }

export interface RSSFeedConfig {
  source: string;
  sourceAvatar: string;
  sourceName: string;
}

export interface Stream {
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name: string;
    type: string;
    title: string;
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
    tag_ids: string[];
    tags: string[];
    is_mature: boolean;
    
}
export interface User {
  id: string;
  username?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}