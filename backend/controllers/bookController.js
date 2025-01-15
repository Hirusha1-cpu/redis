const Book = require('../models/Book');
const redisClient = require('../config/redis');

// Cache duration in seconds
const CACHE_DURATION = 3600; // 1 hour

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        
        // Set cache
        await redisClient.setEx('book:all', CACHE_DURATION, JSON.stringify(books));
        
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        // Set cache
        await redisClient.setEx(`book:${req.params.id}`, CACHE_DURATION, JSON.stringify(book));
        
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        const savedBook = await book.save();
        
        // Invalidate the all books cache
        await redisClient.del('book:all');
        
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        // Invalidate caches
        await redisClient.del(`book:${req.params.id}`);
        await redisClient.del('book:all');
        
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        
        // Invalidate caches
        await redisClient.del(`book:${req.params.id}`);
        await redisClient.del('book:all');
        
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};