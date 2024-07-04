const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Use the routes defined in routes/index.js
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
