const Book = require('../models/Book');
const axios = require('axios');
const csv = require('csv-parser');

exports.uploadBooks = async (req, res) => {
    const { url } = req.body; // URL provided in the request body

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const response = await axios.get(url, { responseType: 'stream' });
        const results = [];

        response.data.pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    const books = results.map(book => ({
                        title: book.title,
                        author: book.author,
                        userId: req.user.id
                    }));
                    await Book.insertMany(books);
                    res.status(201).json(books);
                } catch (error) {
                    res.status(400).json({ error: error.message });
                }
            });
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch data from URL' });
    }
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSellerBooks = async (req, res) => {
    try {
        const books = await Book.find({ userId: req.user.id });
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const { title, author } = req.body;
        const book = req.record;
        book.title = title;
        book.author = author;
        await book.save();
        res.json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = req.record;
        await book.remove();
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
