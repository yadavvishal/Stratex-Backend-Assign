const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Route to upload books via file
router.post('/upload', authenticateToken, authorizeRole('seller'), upload.single('file'), bookController.uploadBooks);

// Route to upload books via URL
router.post('/upload-url', authenticateToken, authorizeRole('seller'), bookController.uploadBooksFromUrl);

// Routes for sellers to manage books
router.get('/seller', authenticateToken, authorizeRole('seller'), bookController.getSellerBooks);
router.put('/:id', authenticateToken, authorizeRole('seller'), bookController.updateBook);
router.delete('/:id', authenticateToken, authorizeRole('seller'), bookController.deleteBook);

// Routes for all users to view books
router.get('/', authenticateToken, bookController.getBooks);
router.get('/:id', authenticateToken, bookController.getBookById);

module.exports = router;
