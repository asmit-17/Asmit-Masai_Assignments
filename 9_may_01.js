const express = require('express');
const app = express();
const port = 3000;

// Define routes
app.get('/home', (req, res) => {
  res.status(200).send('<h1>Welcome to Home Page</h1>');
});

app.get('/aboutus', (req, res) => {
  res.status(200).json({ message: 'This is the about us page of our application.' });
});

app.get('/contactus', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Contact Us</title>
    </head>
    <body>
      <h1>Contact Information</h1>
      <p>Email: contact@example.com</p>
      <p>Phone: +91 9876543210</p>
    </body>
    </html>
  `);
});

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});