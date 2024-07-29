import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handle GET requests to fetch servers
export async function GET(req: NextRequest) {
  try {
    // Extract userId from query parameters
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }

    // Fetch the user to get the list of serverIds
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { serverIds: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch servers where serverId is in the user's serverIds
    const servers = await prisma.server.findMany({
      where: {
        id: { in: user.serverIds }
      }
    });

    return NextResponse.json(servers, { status: 200 });
  } catch (error) {
    console.error('Error fetching servers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Handle GET request
/*export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { serverIds: true, channelIds: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const servers = await prisma.server.findMany({
      where: {
        id: { in: user.serverIds }
      }
    });

    const channels = await prisma.channel.findMany({
      where: {
        id: { in: user.channelIds }
      }
    });

    return NextResponse.json({ servers, channels }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}*/

// Handle POST request
export async function POST(req: NextRequest) {
  try {
    const { name, image, ownerId, membersIds } = await req.json();

    if (!name || !ownerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create the server
    const server = await prisma.server.create({
      data: {
        name,
        image,
        ownerId,
        membersIds,
        channels: {
          create: {
            name: 'general',
            type: 'server',
            creatorId: ownerId,
            membersIds,
          }
        }
      },
      include: {
        channels: true,
      }
    });

    const generalChannel = server.channels[0];

    await prisma.server.update({
      where: { id: server.id },
      data: {
        channelIds: {
          push: generalChannel.id,
        },
      },
    });

    await prisma.channel.update({
      where: { id: generalChannel.id },
      data: {
        serverId: server.id,
      },
    });

    // Update users to link to the new server
    await prisma.user.updateMany({
      where: {
        id: { in: [ownerId, ...membersIds] }
      },
      data: {
        serverIds: {
          push: server.id
        },
        channelIds: {
          push: generalChannel.id
        }
      }
    });

    return NextResponse.json({ message: 'Server created successfully', server }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create server' }, { status: 500 });
  }
}
