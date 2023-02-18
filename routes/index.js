const express = require('express');
const shortUrlController = require('../controllers/shorturl.js');

const router = express.Router();

router.post('/shorten', shortUrlController.generateShortUrl);

router.get('/:shortUrlCode', shortUrlController.getLongUrl);

module.exports = router;