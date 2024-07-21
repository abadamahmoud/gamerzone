// server.ts
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Adjust this to your client URL for production
    methods: ['GET', 'POST'],
  },
});
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('sendMessage', async (message) => {
    const { chatRoomId, senderId, content, receiverId } = message;

    // Ensure IDs are valid
    if (!chatRoomId || !senderId || !receiverId) {
      console.error('Invalid message data:', message);
      return;
    }

    try {
      const newMessage = await prisma.message.create({
        data: {
          content,
          timestamp: new Date(),
          chatRoom: {
            connect: { id: chatRoomId },
          },
          sender: {
            connect: { id: senderId },
          },
          receiver: {
            connect: { id: receiverId }, // Ensure receiverId is valid
          },
        },
      });
      io.to(chatRoomId).emit('receiveMessage', newMessage);
    } catch (error) {
      console.error('Error creating message:', error);
    }
  });

  socket.on('joinRoom', (chatRoomId) => {
    socket.join(chatRoomId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server is listening on port 3001');
});
