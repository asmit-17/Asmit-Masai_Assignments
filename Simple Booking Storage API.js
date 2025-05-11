const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;
const dbFilePath = path.join(__dirname, 'db.json');

app.use(express.json());

const readDb = async () => {
  try {
    const data = await fs.readFile(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading db.json:', error);
    throw error;
  }
};

const writeDb = async (data) => {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to db.json:', error);
    throw error;
  }
};


app.get('/books', async (req, res) => {
  try {
    const db = await readDb();
    res.status(200).json(db.books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const db = await readDb();
    const bookId = parseInt(req.params.id);
    const book = db.books.find(b => b.id === bookId);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve book' });
  }
});

app.post('/books', async (req, res) => {
  try {
    const { title, author, genre, publicationYear } = req.body;
    if (!title || !author || !genre || typeof publicationYear !== 'number') {
      return res.status(400).json({ error: 'Title, author, genre, and publicationYear are required' });
    }

    const db = await readDb();
    const newBook = {
      id: db.books.length > 0 ? Math.max(...db.books.map(b => b.id)) + 1 : 1,
      title,
      author,
      genre,
      publicationYear,
    };
    db.books.push(newBook);
    await writeDb(db);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add new book' });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const { title, author, genre, publicationYear } = req.body;
    const db = await readDb();
    const bookIndex = db.books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
      db.books[bookIndex] = { ...db.books[bookIndex], title, author, genre, publicationYear };
      await writeDb(db);
      res.status(200).json(db.books[bookIndex]);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const db = await readDb();
    const initialLength = db.books.length;
    db.books = db.books.filter(b => b.id !== bookId);

    if (db.books.length < initialLength) {
      await writeDb(db);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});


app.get('/books/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const db = await readDb();
    const genreBooks = db.books.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
    res.status(200).json(genreBooks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books by genre' });
  }
});

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});