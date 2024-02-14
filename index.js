import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { clientMessage, privateMessage } from "./Controller/chatcontroller.js";
import { Connect } from './Utilities/database.js';
import router from './Routes/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to branch chat app"
    });
});

app.use('/api/v1', router);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['POST', 'GET']
    }
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error: Token missing'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
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
    });

    socket.on("client_message", (data) => {
        console.log("recieing data from  client : ", data);
        io.emit("messages", data);
        console.log("sending data to client : ", data);
    });

    socket.on("agent_respond", (data) => {
        io.to(data.socketId).emit("agent_response", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


server.listen(PORT, async () => {
    try {
        const response = await Connect();
        if (response.status === "success") {
            console.log('Database Connected');
            console.log(`Server is running on port ${PORT}`);
        }
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
});