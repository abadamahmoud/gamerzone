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
