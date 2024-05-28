const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
const Book = require('../models/Book');

// Upload books via file
exports.uploadBooks = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'File is required' });
    }

    try {
        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                const books = results.map(book => ({
                    title: book.title,
                    author: book.author,
                    userId: req.user.id
                }));

                // Validate book data
                for (let book of books) {
                    if (!book.title || !book.author) {
                        return res.status(400).json({ error: 'Book validation failed: title and author are required.' });
                    }
                }

                await Book.insertMany(books);
                fs.unlinkSync(req.file.path); // Remove the uploaded file from the server
                res.status(201).json(books);
            });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Upload books via URL
exports.uploadBooksFromUrl = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const response = await axios.get(url, { responseType: 'stream' });
        const results = [];
        response.data
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                const books = results.map(book => ({
                    title: book.title,
                    author: book.author,
                    userId: req.user.id
                }));

                // Validate book data
                for (let book of books) {
                    if (!book.title || !book.author) {
                        return res.status(400).json({ error: 'Book validation failed: title and author are required.' });
                    }
                }

                await Book.insertMany(books);
                res.status(201).json(books);
            });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all books for a seller
exports.getSellerBooks = async (req, res) => {
    try {
        const books = await Book.find({ userId: req.user.id });
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!book) {
            return res.status(404).json({ error: 'Book not found or not authorized' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!book) {
            return res.status(404).json({ error: 'Book not found or not authorized' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
