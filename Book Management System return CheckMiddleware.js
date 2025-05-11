const bookModel = require('../models/bookModel');

const returnCheckMiddleware = async (req, res, next) => {
  const bookId = req.params.id;
  const book = await bookModel.getBookById(bookId);

  if (!book) {
    return res.status(400).json({ message: 'Invalid book ID.' });
  }

  if (!book.isBorrowed || !book.borrowedDate) {
    return res.status(400).json({ message: 'This book was not borrowed.' });
  }

  const borrowedDate = new Date(book.borrowedDate);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - borrowedDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  if (daysDifference < 3) {
    return res.status(400).json({ message: 'Book can only be returned after 3 days of borrowing.' });
  }

  next();
};

module.exports = returnCheckMiddleware;