import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/getSession';
import { NextRequest, NextResponse } from 'next/server';





export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const data = await req.json(); 

  if (req.method === 'POST') {
    const { name, creatorId, membersIds, serverId } = data;
    console.log("data :",creatorId );

    if (!serverId || !name || !creatorId || !membersIds) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    try {
      const channel = await prisma.channel.create({
        data: {
          name,
          serverId: serverId as string,
          creatorId,
          membersIds,
          type: 'server',
        },
      });

      // Update server to include the new channel
      await prisma.server.update({
        where: { id: serverId as string },
        data: {
          channelIds: { push: channel.id },
        },
      });

      // Update members to include the new channel
      await prisma.user.updateMany({
        where: { id: { in: membersIds } },
        data: {
          channelIds: { push: channel.id },
        },
      });

      return NextResponse.json(channel, { status: 201 });


    } catch (error) {
      console.error('Error creating channel:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });

    }
  } else {
    const headers = new Headers();
    headers.set('Allow', 'POST');
    return NextResponse.json(`Method ${req.method} Not Allowed`, { status: 405, headers });
  }
  
}

export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const serverId = params.serverId;

  try {
    // Fetch server and its channels and messages
    const server = await prisma.server.findUnique({
      where: { id: serverId },
      include: {
        channels: {
          include: {
            messages: true, // Include messages in the channels
          },
        },
      },
    });

    if (!server) {
      return NextResponse.json({ error: 'Server not found' }, { status: 404 });
    }

    if (server.ownerId !== session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Fetch all users who are members of the server
    const members = await prisma.user.findMany({
      where: {
        serverIds: { has: serverId },
      },
    });

    // Collect all channel IDs and message IDs and members IDs
    const channelIds = server.channels.map(channel => channel.id);
    const messageIds = server.channels.flatMap(channel => channel.messages.map(message => message.id));
    const memberIds = members.map(member => member.id);

    for (const memberId of memberIds) {
      // Fetch user details
      const user = await prisma.user.findUnique({
        where: { id: memberId },
      });

      if (user) {
        // Remove channel references from user
        await prisma.user.update({
          where: { id: memberId },
          data: {
            channelIds: {
              set: user.channelIds.filter(id => !channelIds.includes(id)),
            },
            sentMessages: {
              disconnect: messageIds.map(messageId => ({ id: messageId })),
            },
            serverIds: {
              set: user.serverIds.filter(id => id !== serverId),
            },
          },
        });
      }
    } 
    // Delete all messages
    await prisma.message.deleteMany({
      where: { id: { in: messageIds } },
    });

    // Delete all channels
    await prisma.channel.deleteMany({
      where: { id: { in: channelIds } },
    });

    // Delete the server
    await prisma.server.delete({
      where: { id: serverId },
    });

    return NextResponse.json({ message: 'Server deleted successfully' });
  } catch (error) {
    console.error('Error deleting server:', error);
    return NextResponse.json({ error: 'Error deleting server' }, { status: 500 });
  }
}
