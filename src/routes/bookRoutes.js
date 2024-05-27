/*const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateToken, authorizeRole, authorizeOwnership } = require('../middleware/auth');
const Book = require('../models/Book'); // Import the Book model
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Routes for sellers to manage books
// router.post('/upload', authenticateToken, authorizeRole('seller'), bookController.uploadBooks);
router.post('/upload', authenticateToken, authorizeRole('seller'), upload.single('file'), bookController.uploadBooks);
router.get('/seller', authenticateToken, authorizeRole('seller'), bookController.getSellerBooks);
router.put('/:id', authenticateToken, authorizeRole('seller'), authorizeOwnership(Book), bookController.updateBook);
router.delete('/:id', authenticateToken, authorizeRole('seller'), authorizeOwnership(Book), bookController.deleteBook);

// Routes for all users to view books
router.get('/', authenticateToken, bookController.getBooks);
router.get('/:id', authenticateToken, bookController.getBookById);

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const multer = require('multer');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // Accept only CSV files
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(new Error('Only CSV files are allowed'));
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routes for sellers to manage books
router.post('/upload', authenticateToken, authorizeRole('seller'), upload.single('file'), bookController.uploadBooks);
router.get('/seller', authenticateToken, authorizeRole('seller'), bookController.getSellerBooks);
router.put('/:id', authenticateToken, authorizeRole('seller'), bookController.updateBook);
router.delete('/:id', authenticateToken, authorizeRole('seller'), bookController.deleteBook);

// Routes for all users to view books
router.get('/', authenticateToken, bookController.getBooks);
router.get('/:id', authenticateToken, bookController.getBookById);

module.exports = router;
