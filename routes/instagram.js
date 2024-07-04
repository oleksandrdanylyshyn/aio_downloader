const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

// Route for Instagram downloader page
router.get('/', (req, res) => {
    res.render('instagram_downloader', { title: 'Instagram Downloader', description: 'Download Instagram Reels and Posts' });
});

// Route to handle Instagram download
router.post('/download', (req, res) => {
    console.log('Request body:', req.body); // Add this line to log the request body

    const url = req.body.url;
    if (!url) {
        return res.status(400).send('URL is required');
    }

    // Call the Python script to download the Instagram reel
    exec(`python3 download_instagram_reel.py ${url}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error}`);
            return res.status(500).send('Error downloading Instagram content');
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);

        // Assuming the downloaded file is named appropriately and saved in the 'Downloads' directory
        const downloadsFolder = process.env.HOME || process.env.USERPROFILE;  // Cross-platform way to get the home directory
        const downloadPath = path.join(downloadsFolder, 'Downloads', `${url.split('/')[4]}.mp4`);

        // Send the file to the user
        res.download(downloadPath, (err) => {
            if (err) {
                console.error(`Error sending file: ${err}`);
                res.status(500).send('Error sending the file');
            }
        });
    });
});

module.exports = router;
