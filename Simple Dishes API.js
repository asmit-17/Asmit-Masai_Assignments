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


app.get('/dishes', async (req, res) => {
  try {
    const db = await readDb();
    res.status(200).json(db.dishes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve dishes' });
  }
});

app.get('/dishes/:id', async (req, res) => {
  try {
    const db = await readDb();
    const dishId = parseInt(req.params.id);
    const dish = db.dishes.find(d => d.id === dishId);

    if (dish) {
      res.status(200).json(dish);
    } else {
      res.status(404).json({ error: 'Dish not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve dish' });
  }
});

app.post('/dishes', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || typeof price !== 'number') {
      return res.status(400).json({ error: 'Name, description, and price are required' });
    }

    const db = await readDb();
    const newDish = {
      id: db.dishes.length > 0 ? Math.max(...db.dishes.map(d => d.id)) + 1 : 1,
      name,
      description,
      price,
    };
    db.dishes.push(newDish);
    await writeDb(db);
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add new dish' });
  }
});

app.put('/dishes/:id', async (req, res) => {
  try {
    const dishId = parseInt(req.params.id);
    const { name, description, price } = req.body;
    const db = await readDb();
    const dishIndex = db.dishes.findIndex(d => d.id === dishId);

    if (dishIndex !== -1) {
      db.dishes[dishIndex] = { ...db.dishes[dishIndex], name, description, price };
      await writeDb(db);
      res.status(200).json(db.dishes[dishIndex]);
    } else {
      res.status(404).json({ error: 'Dish not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update dish' });
  }
});

app.delete('/dishes/:id', async (req, res) => {
  try {
    const dishId = parseInt(req.params.id);
    const db = await readDb();
    const initialLength = db.dishes.length;
    db.dishes = db.dishes.filter(d => d.id !== dishId);

    if (db.dishes.length < initialLength) {
      await writeDb(db);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Dish not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete dish' });
  }
});


app.get('/dishes/cheap', async (req, res) => {
  try {
    const maxPrice = parseFloat(req.query.maxPrice);
    if (isNaN(maxPrice)) {
      return res.status(400).json({ error: 'Invalid or missing maxPrice parameter' });
    }

    const db = await readDb();
    const cheapDishes = db.dishes.filter(dish => dish.price < maxPrice);
    res.status(200).json(cheapDishes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cheap dishes' });
  }
});

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});