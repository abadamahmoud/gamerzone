
export const fetchTwitchStreams = async (clientId: string, accessToken: string, maxStreams: number = 100) => {
    let streams: any[] = [];
    let cursor = null;
    
    while (streams.length < maxStreams) {
      const url = new URL('https://api.twitch.tv/helix/streams');
      url.searchParams.append('first', '20');
      if (cursor) {
        url.searchParams.append('after', cursor);
      }
  
      const response = await fetch(url.toString(), {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch Twitch streams');
      }
  
      const data = await response.json();
      
      streams = streams.concat(data.data);
      cursor = data.pagination?.cursor;
  
      if (!cursor || data.data.length === 0) {
        break;
      }
    }
    
  
    return streams.slice(0, maxStreams);
  };
  

  