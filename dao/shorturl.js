const ShortUrl = require('../models/shorturl');

async function createShortUrl(longUrl, shortUrlCode, shortUrl) {
    const newUrl = new ShortUrl({
        longUrl,
        shortUrl,
        shortUrlCode,
        createdAt: new Date(),
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    await newUrl.save();
}

async function getShortUrlByCode(shortUrlCode) {
    const shortUrl = await ShortUrl.find({ shortUrlCode });
    return shortUrl;
}

async function findOne(longUrl) {
    const shortUrl = ShortUrl.findOne( longUrl);
    return shortUrl;
}

module.exports = {
    createShortUrl,
    getShortUrlByCode,
    findOne,
};
