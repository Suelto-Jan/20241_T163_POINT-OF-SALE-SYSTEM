import express from 'express';
import { getActiveAds, createAd, updateAd, deleteAd } from '../Controller/adController.js';
import multer from 'multer';

// Configure multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'ads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

 const upload = multer({ storage: storage });

const router = express.Router();

// Get all active ads (products)
router.get('/active', getActiveAds);

// Create a new ad (product) with file upload
router.post('/create', upload.single('image'), createAd);

// Update an existing ad (product) with file upload
router.put('/:id', upload.single('image'), updateAd);

// Delete an ad (product)
router.delete('/:id', deleteAd);

export default router;
