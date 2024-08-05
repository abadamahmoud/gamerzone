import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { getSession } from '@/lib/getSession';

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();
 
  const { creatorId, recipientId } = data;

  if (!creatorId || !recipientId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const channelExists = await prisma.channel.findFirst({
      where: {
        type: 'direct',
        membersIds: {
          hasEvery: [creatorId, recipientId],
        },
      },
    });
    if (channelExists) {
      return NextResponse.json({ error: 'Direct message channel already exists' }, { status: 400 });
    }
    const membersIds = [ creatorId, recipientId];
    const directChannel = await prisma.channel.create({
      data: {
        type: 'direct',
        creatorId,
        membersIds
      },
    });

    // Update members to include the new direct channel
    await prisma.user.updateMany({
      where: {
        id: { in: membersIds },
      },
      data: {
        channelIds: { push: directChannel.id },
      },
    });

    return NextResponse.json(directChannel, { status: 201 });
  } catch (error) {
    console.error('Error creating direct message channel:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
