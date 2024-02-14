import jwt from 'jsonwebtoken';
import { clientMessage, privateMessage } from "../Controller/chatcontroller.js";
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error: Token missing'));
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        socket.decoded = decoded;
        next();
    } catch (error) {
        return next(new Error('Authentication error: Invalid token'));
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id, socket.decoded);

    socket.on("client_data", (data) => {
        if (data.role === 'Agent') {
            socket.join('agents', () => {
                console.log(`User joined room: ${socket.id} to agents`);
            });
        }
        console.log("Received client_data event from socket:", socket.id);
    });

    socket.on("client_message", () => {
        const response = clientMessage();
        io.to('response_room').emit("messages", response.data);
    });

    socket.on("agent_respond", () => {
        const response = privateMessage();
        io.to(socket.id).emit("agent_response", response.data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        socket.leave('agents');
        socket.leave('users');
    });
});

export default io;