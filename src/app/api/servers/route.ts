import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, image, ownerId, memberIds } = await req.json();

    // Create the server
    const server = await prisma.server.create({
      data: {
        name,
        image,
        ownerId,
        channels: {
          create: {
            name: 'general',
            type: 'server',
            creatorId: ownerId,
          }
        }
      }
    });

    // Update users to link to the new server
    await prisma.user.updateMany({
      where: {
        id: { in: [ownerId, ...memberIds] }
      },
      data: {
        serverIds: {
          push: server.id
        }
      }
    });

    return NextResponse.json({ message: 'Server created successfully', server }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create server' }, { status: 500 });
  }
}
