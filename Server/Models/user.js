import mongoose from 'mongoose';

// Define a schema for the User model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    pin: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the User model from the schema
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
