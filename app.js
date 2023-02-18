const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const cors = require("cors");
const shortUrlRouter = require("./routes");

require("dotenv").config({ path: "./config/.env"});
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/urldb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    })
app.use(cors());
app.use(express.json());
//routes
app.use("/", shortUrlRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app