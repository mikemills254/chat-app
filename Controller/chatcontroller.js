import { Message } from '../Model/models.js';
import express from 'express'

export const clientMessage = async (req, res) => {
    try {
        const { sender, content, username, socketId } = req.body;

        const urgency = analyzeUrgency(content);

        const message = new Message({
            sender: sender,
            content: content,
            urgency: urgency,
            username: username,
            socketId: socketId
        });

        await message.save();

        return res.status(200).json({ 
            status: "Success",
            data: message
        });
    } catch (error) {
        console.log("Internal Server Error " + error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find()  
        if (!messages) {
            return res.status(404).json({
                message: "No messages were found"
            });
        }
    
        return res.status(200).json({
            message: "Successfully retrieved messages",
            data: messages
        });
  
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { agent } = req.body;

        const message = await Message.findByIdAndUpdate(id, { agent }, { new: true });

        if (!message) {
            return res.status(404).json({ message: 'Cannot find the message.' });
        } else {
            return res.status(200).json({
                status: 'success',
                data: message
            });
        }
    } catch (error) {
        console.log(`Error updating the message: ${error}`);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

export const getSpecificMessage = async (req, res) => {
    try {
        const { id } = req.params
        const message = await Message.findById(id)

        if (!message) {
            return res.status(404).json({ message: 'No such message' });
        } else {
            return res.status(200).json({
                status: 'success',
                data: message
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}


export const privateMessage = async (req, res) => {
    try {
        const { sender, recipient, content } = req.body;

        if (!sender || !recipient || !content) {
            res.status(400).json({ error: "Please provide all the information" });
            return;
        }

        const message = new Message({
            sender: sender,
            recipient: recipient,
            content: content
        })

        message.save()

        return res.status(200).json({ 
            data: message,
            status: "Message sent successfully"
        });
    } catch (error) {
        console.log("Internal Server Error " + error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const agentResponse = async (req, res) => {
    try {
        const {content, sender, recipient, socketId, agent } = req.body

        const agentResponse = new Message({
            sender: sender,
            recipient: recipient,
            content: content,
            socketId: socketId,
            agent: agent
        })

        await agentResponse.save()

        return res.status(200).json({
            message: "Success",
            data: agentResponse
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

const analyzeUrgency = (content) => {
    const urgentKeywords = [
        'emergency',
        'urgent',
        'critical',
        'help',
        'issue',
        'error',
        'trouble',
        'problem', 
        'not working',
        'loan',
        'validate',
        'rejected',
        'not satisfied',
        'blocked'
    ];

    const containsUrgentKeyword = urgentKeywords.some(keyword => content.toLowerCase().includes(keyword));

    return containsUrgentKeyword ? "Urgent" : "Regular";
};

