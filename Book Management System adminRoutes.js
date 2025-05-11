const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/books', adminController.addBook);
router.get('/books', adminController.getAllBooks);
router.patch('/books/:id', adminController.updateBook);
router.delete('/books/:id', adminController.deleteBook);

module.exports = router;