import { Stream } from "@/types";

export const fetchTwitchStreams = async (clientId: string, accessToken: string, maxStreams: number = 100) => {
  let streams: Stream[] = [];
  let cursor: string | null = null;
  
  // Fetch streams
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
    
    const newStreams = data.data;
    streams = streams.concat(newStreams);
    cursor = data.pagination?.cursor;

    if (!cursor || newStreams.length === 0) {
      break;
    }
  }
  
  // Fetch user details for each stream to get avatar URLs
  const batchSize = 100; // Adjust based on API limits and performance
  const userIds = Array.from(new Set(streams.map(stream => stream.user_id)));

  const fetchUserBatch = async (ids: string[]) => {
    const url = `https://api.twitch.tv/helix/users?${ids.map(id => `id=${encodeURIComponent(id)}`).join('&')}`;
    
    const response = await fetch(url, {
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch Twitch user details: ${errorText}`);
    }

    const userData = await response.json();
   
    return userData.data; // Ensure the data field is used here
  };

  const fetchAllUsers = async () => {
    const userBatches = [];
    for (let i = 0; i < userIds.length; i += batchSize) {
      const batch = userIds.slice(i, i + batchSize);
      userBatches.push(fetchUserBatch(batch));
    }
    
    const userResponses = await Promise.all(userBatches);
    const users = userResponses.flat().reduce((acc: { [key: string]: string }, user: any) => {
      if (user.id && user.profile_image_url) {
        acc[user.id] = user.profile_image_url;
      }
      return acc;
    }, {});
    return users;
  };

  // Await the fetchAllUsers call to get user details
  const users = await fetchAllUsers();

  // Attach avatars to streams
  streams = streams.map(stream => ({
    ...stream,
    profile_image_url: users[stream.user_id] || ''
  }));

  return streams.slice(0, maxStreams);
};
