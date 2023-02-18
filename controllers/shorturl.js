const ShortUrl = require("../dao/shorturl.js");
const { nanoid } = require("nanoid");
const validateUrl = require("../utils/util.js");

require("dotenv").config({ path: "./config/.env" });

const generateShortUrl = async (req, res) => {
  const { longUrl } = req.body;
  const shortUrlCode = nanoid(11);
  if (!validateUrl(longUrl)) {
    return res.status(400).json({ message: "Invalid URL" });
  }
  try {
    const existingUrl = await ShortUrl.findOne({ longUrl });
    if (existingUrl) {
      res.status(200).json({ shortUrl: existingUrl.shortUrl });
    } else {
      const shortUrl = `https://${process.env.SHORT_URL_PREFIX}/${shortUrlCode}`;
      ShortUrl.createShortUrl(longUrl, shortUrlCode, shortUrl);
      res.status(200).json({ shortUrl });
    }
  } catch (err) {
    console.error(`Error generating short URL: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getLongUrl = async (req, res) => {
  const { shortUrlCode } = req.params;
  try {
    //procure a URL curta no banco de dados
    const url = await ShortUrl.findOne({ shortUrlCode });
    if (url && url.expiry > new Date()) {
      res.redirect(url.longUrl);
    } else {
      res.status(404).json({ message: "Short URL not found" });
    }
  } catch (err) {
    console.error(`Error getting long URL: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  generateShortUrl,
  getLongUrl,
};
