import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/getSession';


export async function GET(req: NextRequest) {
  try {
    const channelId = req.nextUrl.searchParams.get('channelId');

    if (!channelId) {
      return NextResponse.json({ error: 'Missing channel ID' }, { status: 400 });
    }

    const messages = await prisma.message.findMany({
      where: { channelId },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: true,  
      },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { channelId, content, senderId } = await req.json();
    if (!channelId || !content || !senderId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        channelId,
        senderId,
        content,
      },
    });


    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}