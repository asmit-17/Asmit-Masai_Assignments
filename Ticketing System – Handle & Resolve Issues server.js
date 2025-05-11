const express = require('express');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/', ticketRoutes);

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});