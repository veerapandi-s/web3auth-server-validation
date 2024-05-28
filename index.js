const express = require('express');
const cors = require('cors');
const { validateUser } = require('./service');
const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Define a POST route
app.post('/validate', validateUser);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
