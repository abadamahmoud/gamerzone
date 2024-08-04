import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the import according to your prisma setup
import { getSession } from '@/lib/getSession';

export async function GET(req: Request, { params }: { params: { serverId: string } }) {
  const { serverId } = params;
  const server = await prisma.server.findUnique({
    where: { id: serverId },
    include: {
      channels: true,
    },
  });

  if (!server) {
    return NextResponse.json({ error: 'Server not found' }, { status: 404 });
  }

  return NextResponse.json(server);
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
               /*sentMessages: {
                 disconnect: messageIds.map(messageId => ({ id: messageId })),
               },*/
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
