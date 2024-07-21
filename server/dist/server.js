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
// server.ts
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Adjust this to your client URL for production
        methods: ['GET', 'POST'],
    },
});
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('sendMessage', (message) => __awaiter(void 0, void 0, void 0, function* () {
        const { chatRoomId, senderId, content, receiverId } = message;
        const newMessage = yield prisma.message.create({
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
                    connect: { id: receiverId }, // Ensure receiver is connected if necessary
                },
            },
        });
        io.to(chatRoomId).emit('receiveMessage', newMessage);
    }));
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
