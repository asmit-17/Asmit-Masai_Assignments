const express = require('express');
const router = express.Router();
const readerController = require('../controllers/readerController');
const returnCheckMiddleware = require('../middleware/returnCheckMiddleware');

router.get('/books', readerController.getAvailableBooks);
router.post('/borrow/:id', readerController.borrowBook);
router.post('/return/:id', returnCheckMiddleware, readerController.returnBook);

module.exports = router;