import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/getSession';
import { NextRequest, NextResponse } from 'next/server';
import { useUser } from '@/context/UserContext';

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
    const server = await prisma.server.findUnique({
      where: { id: serverId },
    });

    if (!server) {
      return NextResponse.json({ error: 'Server not found' }, { status: 404 });
    }

    if (server.ownerId !== session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete all channels and their messages within the server
    await prisma.channel.deleteMany({
      where: { serverId: serverId },
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