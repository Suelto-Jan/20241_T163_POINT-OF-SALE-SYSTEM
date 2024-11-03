import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://2201102887:test123@cluster0.f3a4r.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0'
        );
        console.log(`MongoDB Connected`); // Use backticks here
    } catch (error) {
        console.error(`Error: ${error.message}`); // Use backticks here
        process.exit(1);
    }
};

export default connectDB;