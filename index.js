import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import server from './Utilities/websocket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.get('/', (req, res) => {
    res.status(201).json({
        message: "Welcome to branch chat app"
    });
});

server.listen(PORT, () => {
    console.log('Server up and running');
});
