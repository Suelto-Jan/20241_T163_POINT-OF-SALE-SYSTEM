const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

userRoutes.post('/register', (req, res) => {
    const newUser = req.body; // Get user data from the request body
    try {
        const createdUser = UserService.createUser(newUser); // Create user
        res.status(201).json(createdUser); // Respond with created user
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
});

// User login
userRoutes.post('/login', (req, res) => {
    const { username, password } = req.body; // Extract credentials from request body
    // This is a simple login logic; in real apps, you should validate credentials properly
    const user = UserService.getAllUsers().find(u => u.username === username && u.password === password);
    
    if (user) {
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Get user profile
userRoutes.get('/profile', (req, res) => {
    const userId = req.userId; // Assume userId is added to req by authentication middleware
    try {
        const user = UserService.getUserById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by ID
userRoutes.get('/user/:userId', (req, res) => {
    const userId = req.params.userId; // Get userId from request parameters
    try {
        const user = UserService.getUserById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Scan endpoint (dummy implementation)
userRoutes.post('/scan', (req, res) => {
    const scanData = req.body; // Get scan data from request body
    // Process scan data
    res.status(200).json({ message: 'Scan processed successfully', data: scanData });
});

// Payment endpoint (dummy implementation)
userRoutes.post('/payment', (req, res) => {
    const paymentInfo = req.body; // Get payment info from request body
    // Process payment
    res.status(200).json({ message: 'Payment processed successfully', paymentDetails: paymentInfo });
});
