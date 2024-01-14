import mongoose from "mongoose";

let isConnected = false;

/**
 * Connects to the MongoDB database using the provided URI and initializes the connection.
 *
 * @async
 * @function
 * @throws {Error} Throws an error if there's an issue with connecting to MongoDB.
 */
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "interest",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = true;

        console.log("MongoDB connected")
    } catch (e) {
        console.log(e);
    }
}