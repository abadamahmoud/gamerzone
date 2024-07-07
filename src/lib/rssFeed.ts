import axios from 'axios';
import Parser from 'rss-parser';
import { RSSFeedConfig , Article} from '@/lib/types'; 

const parser = new Parser();



const fetchRSSFeed = async (config: RSSFeedConfig): Promise<Article[]> => {
  try {
    const response = await axios.get(config.source);
    const feed = await parser.parseString(response.data);
    return feed.items.map(item => ({
      title: item.title ?? '',
      source: config.source,
      sourceAvatar: config.sourceAvatar,
      thumbnail: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600",
      pubDate: item.pubDate ?? '',
      reads: 0
    }));
  } catch (error) {
    console.error(`Error fetching data from ${config.source}:`, error);
    return [];
  }
};
const IGN_CONFIG: RSSFeedConfig = {
  source: 'https://feeds.ign.com/ign/games-all',
  sourceAvatar: 'https://seeklogo.com/images/I/ign-logo-4A32DEDED6-seeklogo.com.png',
};

const KOTAKU_CONFIG: RSSFeedConfig = {
  source: 'https://kotaku.com/rss',
  sourceAvatar: 'https://i.kinja-img.com/image/upload/c_fill,h_200,q_80,w_200/v4sckews2f3bzf0ztbkf.png',
};

const POLYGON_CONFIG: RSSFeedConfig = {
  source: 'https://www.polygon.com/rss/index.xml',
  sourceAvatar: 'https://cdn1.vox-cdn.com/uploads/chorus_asset/file/8402075/941450_609208285758470_875871287_n.0.png',
};

const GAMESPOT_CONFIG: RSSFeedConfig = {
  source: 'https://www.gamespot.com/feeds/mashup/',
  sourceAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk8Q4D4g1-HpqiMi1X0Wb7mLwDfzxKVg4XQw&s',
};


export const aggregateRSSFeed= async (): Promise<Article[]> => {
  const [ign, kotaku, polygon, gamespot] = await Promise.all([
    fetchRSSFeed(IGN_CONFIG),
    fetchRSSFeed(KOTAKU_CONFIG),
    fetchRSSFeed(POLYGON_CONFIG),
    fetchRSSFeed(GAMESPOT_CONFIG),
  ]);

  return [
    ...ign,
    ...kotaku,
    ...polygon,
    ...gamespot,
  ];
};