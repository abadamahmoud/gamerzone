"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Update with your frontend URL in production
        methods: ["GET", "POST"]
    }
});
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Handling socket connections
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    // Join a specific channel
    socket.on('joinChannel', (channelId) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(channelId);
        console.log(`User ${socket.id} joined channel ${channelId}`);
    }));
    // Handle sending messages
    socket.on('sendMessage', (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newMessage = yield prisma.message.create({
                data: {
                    channelId: message.channelId,
                    senderId: message.senderId,
                    content: message.content,
                    type: message.type,
                },
            });
            io.to(message.channelId).emit('newMessage', newMessage);
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    }));
    // Handle user joining a server
    socket.on('joinServer', (serverId) => __awaiter(void 0, void 0, void 0, function* () {
        const server = yield prisma.server.findUnique({
            where: { id: serverId },
            include: { UserServers: true },
        });
        if (server) {
            server.UserServers.forEach(userServer => {
                // Notify users in the server
                io.to(userServer.userId).emit('serverUpdate', server);
            });
        }
    }));
    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
