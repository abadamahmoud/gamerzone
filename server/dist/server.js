"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on('connection', (socket) => {
    console.log('a user connected');
    // Handle new server creation
    socket.on('newServer', () => {
        io.emit('updateServers');
    });
    // Handle new channel creation
    socket.on('newChannel', () => {
        io.emit('updateChannels');
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Socket.IO server is running on port ${PORT}`);
});
/*import express from 'express';
import {createServer} from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // Update with your frontend URL in production
    methods: ["GET", "POST"]
  }
});

// Middleware to parse JSON bodies
app.use(express.json());

// Handling socket connections
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a specific channel
  socket.on('joinChannel', async (channelId) => {
    socket.join(channelId);
    console.log(`User ${socket.id} joined channel ${channelId}`);
  });

  // Handle sending messages
  socket.on('sendMessage', async (message) => {
    try {
      const newMessage = await prisma.message.create({
        data: {
          channelId: message.channelId,
          senderId: message.senderId,
          content: message.content,
          type: message.type,
        },
      });

      io.to(message.channelId).emit('newMessage', newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  // Handle user joining a server
  socket.on('joinServer', async (serverId) => {
    const server = await prisma.server.findUnique({
      where: { id: serverId },
      include: { UserServers: true },
    });

    if (server) {
      server.UserServers.forEach(userServer => {
        // Notify users in the server
        io.to(userServer.userId).emit('serverUpdate', server);
      });
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/
