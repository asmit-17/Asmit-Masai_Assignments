const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const readerRoutes = require('./routes/readerRoutes');
const loggerMiddleware = require('./middleware/loggerMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use('/admin', adminRoutes);
app.use('/reader', readerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});