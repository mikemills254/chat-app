import { Server } from 'socket.io';
import http from 'http';

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["POST", "GET"]
    }
});

const users = new Map(); // Map to store client IDs

io.on("connection", (socket) => {
    let clientID = null;

    // Check if client has an existing ID stored in the query parameters
    const storedID = socket.handshake.query.id;
    if (storedID && users.has(storedID)) {
        // If client has an existing ID stored, use it
        clientID = storedID;
    } else {
        // Generate a new client ID and store it
        clientID = generateClientID();
        users.set(clientID, socket);
    }

    // Send the client ID to the connected client
    socket.emit("clientID", clientID);

    // Event handler for private messages
    socket.on("private_message", (id, message) => {
        // Check if the recipient is online
        const receiverSocket = users.get(id);
        if (receiverSocket) {
            // Store message and sender information
            const messageData = { senderId: clientID, message };
            // Emit the private message only to the receiver
            receiverSocket.emit("private_message", messageData);
        } else {
            // Handle case when recipient is offline
            console.log(`User ${id} is offline.`);
            // Optionally, you can emit an event to the sender to inform about the offline status
        }
    });

    // Event handler for user disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", clientID);
        users.delete(clientID); // Remove user from the Map on disconnection
    });
});

// Function to generate a unique client ID
function generateClientID() {
    return Math.random().toString(36).substr(2, 9);
}

export default server;
