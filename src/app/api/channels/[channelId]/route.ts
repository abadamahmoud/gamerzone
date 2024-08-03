import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/getSession';
import AuthProvider from '@/components/AuthProvider';

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


export async function DELETE(req: Request, { params }: { params: { channelId: string } }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const channelId = params.channelId;

  try {
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    if (channel.creatorId !== session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete all messages within the channel
    await prisma.message.deleteMany({
      where: { channelId: channelId },
    });

    // Delete the channel
    await prisma.channel.delete({
      where: { id: channelId },
    });

    return NextResponse.json({ message: 'Channel deleted successfully' });
  } catch (error) {
    console.error('Error deleting channel:', error);
    return NextResponse.json({ error: 'Error deleting channel' }, { status: 500 });
  }
}
