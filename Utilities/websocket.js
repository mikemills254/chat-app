import { Server } from 'socket.io';
import http from 'http';

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["POST", "GET"]
    }
});

const messages = [];

io.on("connection", (socket) => {
    socket.emit("connected", {
        message: "Welcome to branch international",
        status: 'Online',
        id: socket.id
    });

    socket.on("private_message", (id, message) => {
        messages.push({ senderId: socket.id, receiverId: id, message });
        const messageData = { senderId: socket.id, message };
        // Emit the private message only to the receiver
        io.to(id).emit("private_message", messageData);
    });

    socket.emit("previous_messages", messages.filter(msg => msg.receiverId === socket.id));
});

export default server;