
import { JSDOM } from 'jsdom';
import parse from 'rss-to-json'


import { RSSFeedConfig, Article } from '@/lib/types';



const fetchRSSFeed = async (config: RSSFeedConfig): Promise<Article[]> => {
  try {
    const data = await parse(config.source)
    
    if (!data) {
      throw new Error(`No data received from: ${config.source}`);
    }
    //console.log(JSON.stringify(data, null, 3));

    return data.items.map(item => {
      let thumbnail = '';
      // get the thumbnail from diffrent sources

      thumbnail = item?.media?.thumbnail?.url || undefined;
      
      
      
      if (!thumbnail) {
      const dom = new JSDOM(item.content);
      const imgElement = dom.window.document.querySelector('img') as HTMLImageElement | null;
      thumbnail = imgElement ? imgElement.src : '';
      
      }
      if (!thumbnail) {
        const dom = new JSDOM(item.description);
        const imgElement = dom.window.document.querySelector('img') as HTMLImageElement | null;
        thumbnail = imgElement ? imgElement.src : '';
        
      }
      
      if (!thumbnail && Array.isArray(item.media.thumbnail))  thumbnail = item.media.thumbnail[0].url

      return {
        title: item.title ?? '',
        source: config.source,
        sourceAvatar: config.sourceAvatar,
        thumbnail: thumbnail || "https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-260nw-2179364083.jpg",
        pubDate: item.pubDate ?? '',
        reads: 0
      }});
  } catch (error) {
    console.error(`Error fetching data from ${config.source}:`, error);
    return [];
  }
};


export const aggregateRSSFeed = async (): Promise<Article[]> => {
  const results = await Promise.all(
    configs.map(config => fetchRSSFeed(config))
  );
  //const results = await  fetchRSSFeed(configs[14])
  return results.flat();
};


const configs: RSSFeedConfig[] = [
  { source: 'https://kotaku.com/rss', sourceAvatar: 'https://i.kinja-img.com/image/upload/c_fill,h_200,q_80,w_200/v4sckews2f3bzf0ztbkf.png' },
  { source: 'https://feeds.ign.com/ign/games-all', sourceAvatar: 'https://seeklogo.com/images/I/ign-logo-4A32DEDED6-seeklogo.com.png' },
  { source: 'https://www.polygon.com/rss/index.xml', sourceAvatar: 'https://cdn1.vox-cdn.com/uploads/chorus_asset/file/8402075/941450_609208285758470_875871287_n.0.png' },
  { source: 'https://www.gamespot.com/feeds/mashup/', sourceAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk8Q4D4g1-HpqiMi1X0Wb7mLwDfzxKVg4XQw&s' },
  { source: 'https://www.vg247.com/feed/', sourceAvatar: 'https://assets.vg247.com/current/img/favicons/favicon-96x96.png' },
  { source: 'https://www.pcgamer.com/rss/', sourceAvatar: 'https://images.pcgamer.com/pcgamer.jpg' },
  { source: 'https://www.eurogamer.net/?format=rss', sourceAvatar: 'https://www.eurogamer.net/favicon.ico' },
  { source: 'https://www.pcgamesn.com/feed', sourceAvatar: 'https://www.pcgamesn.com/favicon.ico' },
  { source: 'https://www.nintendolife.com/feeds/latest', sourceAvatar: 'https://images.nintendolife.com/site/icon/128x128.png' },
  { source: 'https://www.destructoid.com/feed/', sourceAvatar: 'https://www.destructoid.com/favicon.ico' },
  { source: 'https://www.siliconera.com/feed/', sourceAvatar: 'https://www.siliconera.com/favicon.ico' },
  { source: 'https://www.theverge.com/games/rss/index.xml', sourceAvatar: 'https://www.theverge.com/favicon.ico' },
  { source: 'https://feeds.feedburner.com/TechCrunch/gaming', sourceAvatar: 'https://techcrunch.com/favicon.ico' },
  
  { source: 'https://www.giantbomb.com/feeds/mashup/', sourceAvatar: 'https://www.giantbomb.com/favicon.ico' },
 
  { source: 'https://www.engadget.com/gaming/rss.xml', sourceAvatar: 'https://www.engadget.com/favicon.ico' },
  
  { source: 'https://www.videogamer.com/rss/', sourceAvatar: 'https://www.videogamer.com/favicon.ico' },
  
  { source: 'https://www.kotaku.com.au/feed/', sourceAvatar: 'https://www.kotaku.com.au/favicon.ico' },
  { source: 'https://www.n4g.com/rss/news', sourceAvatar: 'https://www.n4g.com/favicon.ico' },
  { source: 'https://www.gameranx.com/feed/', sourceAvatar: 'https://www.gameranx.com/favicon.ico' },
 
  { source: 'https://www.mmos.com/rss', sourceAvatar: 'https://www.mmos.com/favicon.ico' },
  
  { source: 'https://www.twinfinite.net/feed/', sourceAvatar: 'https://www.twinfinite.net/favicon.ico' },
  
  { source: 'https://www.trustedreviews.com/category/gaming/feed', sourceAvatar: 'https://www.trustedreviews.com/favicon.ico' },
  { source: 'https://www.sector.sk/rss/', sourceAvatar: 'https://www.sector.sk/favicon.ico' },
  { source: 'https://www.vooks.net/feed/', sourceAvatar: 'https://www.vooks.net/favicon.ico' },
 
  { source: 'https://www.gamingbolt.com/feed', sourceAvatar: 'https://www.gamingbolt.com/favicon.ico' },
  
  { source: 'https://www.gamespace.com/feed/', sourceAvatar: 'https://www.gamespace.com/favicon.ico' },
 
  { source: 'https://www.wccftech.com/feed/', sourceAvatar: 'https://www.wccftech.com/favicon.ico' },
 
  { source: 'https://www.hardcoregamer.com/feed/', sourceAvatar: 'https://www.hardcoregamer.com/favicon.ico' },
 
  { source: 'https://www.psu.com/news/feed/', sourceAvatar: 'https://www.psu.com/favicon.ico' },
  { source: 'https://www.psxextreme.com/feed/', sourceAvatar: 'https://www.psxextreme.com/favicon.ico' },
  { source: 'https://www.bluemoongame.com/feed/', sourceAvatar: 'https://www.bluemoongame.com/favicon.ico' },
  { source: 'https://www.thisgengaming.com/feed/', sourceAvatar: 'https://www.thisgengaming.com/favicon.ico' },
  { source: 'https://www.nintendojo.com/feed/', sourceAvatar: 'https://www.nintendojo.com/favicon.ico' },
  
  { source: 'https://www.ghettogamer.net/feed/', sourceAvatar: 'https://www.ghettogamer.net/favicon.ico' },
  { source: 'https://www.xblafans.com/feed/', sourceAvatar: 'https://www.xblafans.com/favicon.ico' },
  { source: 'https://www.ps3blog.net/feed/', sourceAvatar: 'https://www.ps3blog.net/favicon.ico' },
  
  { source: 'https://www.siliconrepublic.com/feed/', sourceAvatar: 'https://www.siliconrepublic.com/favicon.ico' },
 
  { source: 'https://www.gaminglyfe.com/feed/', sourceAvatar: 'https://www.gaminglyfe.com/favicon.ico' },
  { source: 'https://www.gamingtrend.com/feed/', sourceAvatar: 'https://www.gamingtrend.com/favicon.ico' },
  
  { source: 'https://www.savingcontent.com/feed/', sourceAvatar: 'https://www.savingcontent.com/favicon.ico' },
  { source: 'https://www.sidequesting.com/feed/', sourceAvatar: 'https://www.sidequesting.com/favicon.ico' },
  
  { source: 'https://www.thegamereviews.com/feed/', sourceAvatar: 'https://www.thegamereviews.com/favicon.ico' },
  { source: 'https://www.thexboxhub.com/feed/', sourceAvatar: 'https://www.thexboxhub.com/favicon.ico' },
  
];

