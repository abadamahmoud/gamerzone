export interface Article {
    title: string;
    source: string;
    sourceAvatar: string;
    thumbnail: string;
    pubDate: string;
    reads: number;
  }

export interface RSSFeedConfig {
  source: string;
  sourceAvatar: string;
}