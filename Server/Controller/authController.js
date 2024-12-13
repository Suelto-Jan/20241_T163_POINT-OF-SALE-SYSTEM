import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import UserModel from '../Models/user.js';
import sendVerificationEmail from '../utills/sendVerificationEmail.js';

// Register user
const register = async (req, res) => {
    const { firstname, lastname, username, email, phonenum, pin, image } = req.body;
    
    const emailToken = uuidv4();  // Generate a unique token
    const pinHash = await bcrypt.hash(pin, 10); // Hash the pin

    const unverifiedUser = new UnverifiedUserModel({
        firstname,
        lastname,
        username,
        email,
        phonenum,
        pinHash,
        emailToken,
        image,
    });

    await unverifiedUser.save();

    sendVerificationEmail(email, emailToken);  // Send verification email

    res.status(200).send("Verification email sent. Please check your inbox.");
};

// Verify email
const verifyEmail = async (req, res) => {
    const { token } = req.query;

    const unverifiedUser = await UnverifiedUserModel.findOne({ emailToken: token });
    if (!unverifiedUser) {
        return res.status(400).send("Invalid or expired token.");
    }

    // Create the verified user
    const verifiedUser = new UserModel({
        firstname: unverifiedUser.firstname,
        lastname: unverifiedUser.lastname,
        username: unverifiedUser.username,
        email: unverifiedUser.email,
        phonenum: unverifiedUser.phonenum,
        pinHash: unverifiedUser.pinHash,
        image: unverifiedUser.image,
    });

    await verifiedUser.save();
    await UnverifiedUserModel.deleteOne({ _id: unverifiedUser._id }); // Delete from unverified collection

    res.status(200).send("Email verified successfully. You can now log in.");
};


export { register, verifyEmail };
