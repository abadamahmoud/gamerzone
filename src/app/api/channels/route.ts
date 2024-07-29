import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handle GET requests to fetch channels
export async function GET(req: NextRequest) {
  try {
    // Extract userId from query parameters
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }

    // Fetch the user to get the list of channelIds
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { channelIds: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch channels where channelId is in the user's channelIds
    const channels = await prisma.channel.findMany({
      where: {
        id: { in: user.channelIds }
      }
    });

    return NextResponse.json(channels, { status: 200 });
  } catch (error) {
    console.error('Error fetching channels:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
