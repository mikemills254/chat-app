import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import server from './Utilities/websocket.js';
import { Connect } from './Utilities/database.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.get('/', (req, res) => {
    res.status(201).json({
        message: "Welcome to branch chat app"
    });
});

server.listen(PORT, async () => {
    try {
        const response = await Connect()
        if(response.status === "success"){
            console.log('Database Connected');
        }
    } catch (error) {
        console.log(error)
    }
});
