const mongoose = require('mongoose');
const { Schema } = mongoose;

const shortUrlSchema = new Schema({
  longUrl: {
    type: String,
    required: true,
    maxlength: 2048,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  shortUrlCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});


const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl;
        