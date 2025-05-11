const express = require('express');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/', todoRoutes);

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});