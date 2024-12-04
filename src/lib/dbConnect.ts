import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("database is already connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONOGODB_URI || "", {});
        connection.isConnected = db.connections[0].readyState;
        console.log("successfully connected");
    } catch (error) {
        console.log("database connection failed ", error);
        process.exit(1);
    }
}

export default dbConnect;
