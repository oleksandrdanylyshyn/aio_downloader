const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'AIO Downloader', description: 'Download Instagram Reels and Posts' });
});

// Route for Instagram downloader page
router.get('/instagram', (req, res) => {
    res.render('instagram_downloader', { title: 'Instagram Downloader', description: 'Download Instagram Reels and Posts' });
});

module.exports = router;