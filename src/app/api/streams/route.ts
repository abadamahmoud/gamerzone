import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchTwitchStreams } from '@/lib/twitchFeed';

const clientId = process.env.TWITCH_CLIENT_ID!;
const accessToken = process.env.TWITCH_ACCESS_TOKEN!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const streams = await fetchTwitchStreams(clientId, accessToken);
    res.status(200).json(streams);
  } catch (error) {
    console.error('Error fetching Twitch streams:', error);
    res.status(500).json({ error: 'Failed to fetch Twitch streams' });
  }
}
