import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/getSession';


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
    // Fetch the channel to verify it exists and get related data
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
      include: {
        server: true,
        messages: true,
      },
    });
    

    if (!channel) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    if (channel.type === "server") {
      if (channel.creatorId !== session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      // Remove the channel reference from the server
      if (channel.server) {
        await prisma.server.update({
          where: { id: channel.server.id },
          data: {
            channelIds: {
              set: channel.server.channelIds.filter(id => id !== channelId),
            },
          },
        });
      }
  
      // Remove the channel reference from users
      const usersWithChannel = await prisma.user.findMany({
        where: {
          channelIds: { has: channelId },
        },
      });
  
      for (const user of usersWithChannel) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            channelIds: {
              set: user.channelIds.filter(id => id !== channelId),
            },
            sentMessages: {
              disconnect: channel.messages.map(message => ({ id: message.id })),
            },
          },
        });
      }
  
      // Delete all messages within the channel
      await prisma.message.deleteMany({
        where: { channelId: channelId },
      });
  
      // Delete the channel
      await prisma.channel.delete({
        where: { id: channelId },
      });

    } else {
      const data = await req.json();
      const { senderId } = data;
      const sender = await prisma.user.findUnique({
        where: { id: senderId }});
        
      const updatedChannelIds = sender?.channelIds.filter(id => id !== channelId);
      await prisma.user.update({
        where: { id: senderId },
        data: { channelIds: updatedChannelIds },
      });
      const channel = await prisma.channel.findUnique({
        where: { id: channelId },
      });
      if (!channel?.membersIds.includes(senderId)) throw new Error(`Channel alredy deleted for this user`)
      const updatedMembersIds = channel?.membersIds.filter(id => id !== senderId);
      await prisma.channel.update({
        where: { id: channelId },
        data: { membersIds: updatedMembersIds },
      });
    }

    

    return NextResponse.json({ message: 'Channel deleted successfully' });
  } catch (error) {
    console.error('Error deleting channel:', error);
    return NextResponse.json({ error: 'Error deleting channel' }, { status: 500 });
  }
}




    
