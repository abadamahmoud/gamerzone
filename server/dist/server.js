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
    // Join and leave channel logic
    socket.on('joinChannel', (channelId) => {
        socket.join(channelId);
    });
    socket.on('joinServer', (serverId) => {
        socket.join(serverId);
    });
    socket.on('leaveServer', (serverId) => {
        socket.leave(serverId);
    });
    socket.on('channelDeleted', () => {
        io.emit('channelDeleted');
        io.emit('updateChannels'); // Broadcast to all clients
    });
    socket.on('serverDeleted', () => {
        io.emit('serverDeleted');
        io.emit('updateServers'); // Broadcast to all clients
    });
    // Handle sending messages
    socket.on('sendMessage', (message) => {
        // Validate message data
        if (!message.channelId || !message.content || !message.senderId) {
            console.error('Invalid message data:', message);
            return;
        }
        // Emit the message to the specified channel
        io.to(message.channelId).emit('newMessage', message);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Socket.IO server is running on port ${PORT}`);
});
