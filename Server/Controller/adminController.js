import express from 'express'
import UserModel from '../Models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
// Get Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await UserModel.findOne({ isAdmin: true });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Admin Profile
export const updateAdminProfile = async (req, res) => {
  const { firstname, lastname, email, pin } = req.body;
  const image = req.file?.path; // Assuming you're using Multer for file uploads

  try {
    // Find the admin user
    const admin = await UserModel.findOne({ isAdmin: true });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update fields
    if (firstname) admin.firstname = firstname;
    if (lastname) admin.lastname = lastname;
    if (email) admin.email = email;

    if (pin) {
      // Validate the pin (e.g., minimum length)
      if (pin.length < 6) {
        return res.status(400).json({ message: 'Pin must be at least 6 characters' });
      }

      // Hash the pin before saving it
      const hashedPin = await bcrypt.hash(pin, 10);
      admin.pin = hashedPin;
    }

    if (image) admin.image = image;

    // Save the updated admin profile
    await admin.save();

    res.status(200).json({ message: 'Admin profile updated successfully', admin });
  } catch (error) {
    console.error('Error updating admin profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Admin Account (Optional)
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await UserModel.findOneAndDelete({ isAdmin: true });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const adminLogin = async (req, res) => {
  const { email, pin } = req.body;

  // Step 1: Validate the input (email and PIN)
  if (!email || !pin) {
    return res.status(400).json({ message: 'Email and PIN are required.' });
  }

  try {
    // Step 2: Find the user who is an admin (e.g., check isAdmin flag)
    const adminUser = await UserModel.findOne({ email, isAdmin: true });

    if (!adminUser) { 
      console.error(`No admin found for email: ${email}`);
      return res.status(404).json({ message: 'Admin user not found.' });
    }

    // Step 3: Compare the provided PIN with the stored (hashed) PIN
    const isPinValid = await bcrypt.compare(pin, adminUser.pin);
    if (!isPinValid) {
      console.error(`Invalid PIN for email: ${email}`);
      return res.status(401).json({ message: 'Invalid PIN.' });
    }

    // Step 4: Generate JWT token for the admin user
    const token = jwt.sign(
      { userId: adminUser._id, isAdmin: adminUser.isAdmin },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Step 5: Return the token to the frontend
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
