const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // set view engine to ejs
app.use(express.static('public')); // serve static files from public folder

app.get('/', (req, res) => {
    res.render('index', {title: 'Instagram Downloader', description: 'Download Instagram Reels and Posts'});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})