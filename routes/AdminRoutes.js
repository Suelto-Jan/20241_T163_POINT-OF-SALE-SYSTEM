const express = require ("express")
const adminRoutes = express.Router()

const {getAll} = require("../controller/admin.controller")

adminRoutes.post('/admin/login', (req, res) => {
    const { username, password } = req.body; // Extract credentials from request body
    // Simple admin login logic; replace with your own authentication logic
    if (username === "admin" && password === "password") {
        res.status(200).json({ message: 'Admin login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Add a new product
adminRoutes.post('/admin/products', (req, res) => {
    const newProduct = req.body; // Get product data from the request body
    try {
        const createdProduct = ProductService.createProduct(newProduct); // Create product
        res.status(201).json(createdProduct); // Respond with created product
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
});

// Update a product by ID
adminRoutes.put('/admin/products/:productId', (req, res) => {
    const productId = req.params.productId; // Get productId from request parameters
    const updatedData = req.body; // Get updated data from request body
    try {
        const updatedProduct = ProductService.updateProduct(productId, updatedData); // Update product
        res.status(200).json(updatedProduct); // Respond with updated product
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Delete a product by ID
adminRoutes.delete('/admin/products/:productId', (req, res) => {
    const productId = req.params.productId; // Get productId from request parameters
    try {
        ProductService.deleteProduct(productId); // Delete product
        res.status(204).send(); // No content
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get all products
adminRoutes.get('/admin/products', (req, res) => {
    try {
        const products = ProductService.getAllProducts(); // Get all products
        res.status(200).json(products); // Respond with the product list
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
});

module.exports = adminRoutes;