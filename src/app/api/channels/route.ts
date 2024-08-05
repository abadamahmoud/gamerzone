import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handle GET requests to fetch channels
export async function GET(req: NextRequest) {
  try {
    // Extract serverId and userId from query parameters
    const serverId = req.nextUrl.searchParams.get('serverId');
    const userId = req.nextUrl.searchParams.get('userId');


    if (serverId) {
      // Fetch channels for the given serverId
      const channels = await prisma.channel.findMany({
        where: {
          serverId: serverId,
          type: 'server'
        }
      });
      
      return NextResponse.json(channels, { status: 200 });
    } if (userId) {
      // Fetch direct message channels for the given userId
      const channels = await prisma.channel.findMany({
        where: {
          membersIds: {
            has: userId,
          },
          type: 'direct',
        },
      });
  
      const channelsWithUserDetails = await Promise.all(
        channels.map(async (channel) => {
          // Find the other member in the channel
          const otherMemberId = channel.membersIds.find((id) => id !== userId);
          
          // Fetch the other member's details
          const otherMember = await prisma.user.findUnique({
            where: {
              id: otherMemberId,
            },
          });
  
          return {
            ...channel,
            name: otherMember?.name || 'Unknown User',
            image: otherMember?.image ,
          };
        })
      );
  
      return NextResponse.json(channelsWithUserDetails, { status: 200 });
    }
   else {
      return NextResponse.json({ error: 'Missing server or user ID' }, { 
        status: 400 });
    }
  } catch (error) {
    console.error('Error fetching channels:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
