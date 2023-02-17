const ShortUrl = require('../models/shorturl');
const { nanoid } = require('nanoid');

const generateShortUrl = async (req, res) => {
  const { longUrl } = req.body;
  const shortUrlCode = nanoid(11);

  try {
    const existingUrl = await ShortUrl.findOne({ longUrl });
    if (existingUrl) {
      res.json({ shortUrl: existingUrl.shortUrl });
    } else {
      const shortUrl = `https://${process.env.SHORT_URL_PREFIX}${shortUrlCode}`;
      const newUrl = new ShortUrl({
        longUrl,
        shortUrl,
        shortUrlCode,
        createdAt: new Date(),
        expiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      await newUrl.save();
      res.json({ shortUrl });
    }
  } catch (err) {
    console.error(`Error generating short URL: ${err}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getLongUrl = async (req, res) => {
  const { shortUrlCode } = req.params;

  try {
    const url = await ShortUrl.findOne({ shortUrlCode });
    if (url && url.expiry > new Date()) {
      res.redirect(url.longUrl);
    } else {
      res.status(404).json({ message: 'Short URL not found' });
    }
  } catch (err) {
    console.error(`Error getting long URL: ${err}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  generateShortUrl,
  getLongUrl,
};
