import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handle GET requests to fetch channels
export async function GET(req: NextRequest) {
  try {
    // Extract serverId from query parameters
    const serverId = req.nextUrl.searchParams.get('serverId');

    if (!serverId) {
      return NextResponse.json({ error: 'Missing server ID' }, { status: 400 });
    }

    // Fetch channels for the given serverId
    const channels = await prisma.channel.findMany({
      where: {
        serverId: serverId
      }
    });

    return NextResponse.json(channels, { status: 200 });
  } catch (error) {
    console.error('Error fetching channels:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


