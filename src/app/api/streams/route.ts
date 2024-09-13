import { NextResponse } from 'next/server';
import { fetchTwitchStreams } from '@/lib/twitchFeed';

const clientId = process.env.TWITCH_CLIENT_ID!;
const accessToken = process.env.TWITCH_ACCESS_TOKEN!;

export async function GET() {
  try {
    const streams = await fetchTwitchStreams(clientId, accessToken);
    return NextResponse.json(streams);
  } catch (error) {
    console.error('Error fetching Twitch streams:', error);
    return NextResponse.json({ error: 'Failed to fetch Twitch streams' }, { status: 500 });
  }
}
