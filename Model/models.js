import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide a username']
    },
    password: {
        type: String,
        minlength: [8, 'Password should be at least 8 characters'],
        required: [true, 'Please provide a password']
    },
    email: {
        type: String,   
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        required: [true, 'Please provide an email address']
    },
    chats: [{
        type: mongoose.Types.ObjectId,
        ref: 'Message'
    }],
    role: {
        type: String,
        enum: ['Client', 'Agent'],
        default: 'Client'
    }
}, { timestamps: true });

const MessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    urgency: {
        type: String,
        enum: ['Regular', 'Urgent'],
        default: 'Regular'
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Message = mongoose.model('Message', MessageSchema);

export { User, Message };
