import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export const Connect = async () => {
    try {
        const client = await mongoose.connect(process.env.DB_URI, {
            serverSelectionTimeoutMS: 5000
        });

        return {
            status: "success",
            data: client
        };
    } catch (error) {
        throw new Error("Error connecting to database: " + error.message);
    }
};

export const Disconnect = async () => {
    try {
        await mongoose.disconnect();
        return {
            status: "success"
        };
    } catch (error) {
        throw new Error("Error disconnecting from database: " + error.message);
    }
};
