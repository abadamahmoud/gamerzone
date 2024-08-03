import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { channelId: string } }) {
  try {
    const { channelId } = params;

    const channel = await prisma.channel.findUnique({
      where: { id: channelId }
    });

    if (!channel) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    return NextResponse.json(channel, { status: 200 });
  } catch (error) {
    console.error('Error fetching channel:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
