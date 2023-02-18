# URL Shortener App

This is a URL shortener app built with Node.js and MongoDB.

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   - `MONGODB_URI`: MongoDB connection string
   - `SHORT_URL_PREFIX`: Short URL prefix (e.g. `www.us.com/`)
4. Start the server: `npm start`

## API

### Generate Short URL

**Endpoint:** `POST /shorten`

**Request body:**
