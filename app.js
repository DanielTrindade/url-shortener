const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const shortUrlRouter = require("./routes");

require("dotenv").config();
const app = express();
try {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"));
} catch (err) {
  console.log(err);
}
app.use(cors());
app.use(express.json());
//routes
app.use("/", shortUrlRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
