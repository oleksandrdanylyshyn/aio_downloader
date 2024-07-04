const express = require('express');
const router = express.Router();

// Import routes for each social network
const instagramRoutes = require('./instagram');
// Use the imported routes
router.use('/instagram', instagramRoutes);

// Route for home page
router.get('/', (req, res) => {
    res.render('index', { title: 'AIO Downloader', description: 'Download Instagram Reels and Posts' });
});

module.exports = router;