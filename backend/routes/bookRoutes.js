const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const cache = require('../middleware/cache');

router.get('/', cache, bookController.getAllBooks);
router.get('/:id', cache, bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;