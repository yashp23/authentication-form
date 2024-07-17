import mongoose from "mongoose";

export const connectionFunction = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongoose connected successfully");
        });

        connection.on('error', (error) => {
            console.error("Connection failed");
            console.error(error);
            process.exit(1);
        });
    } catch (error) {
        console.log("SOMETHING WENT WRONG FRM MONGO DB " + error);
        console.log(error);
    }
}