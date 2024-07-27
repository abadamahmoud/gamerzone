import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, image, ownerId, membersIds } = await req.json();

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
            membersIds: membersIds,
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
