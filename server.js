require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

app.use(express.json());

const subscribersRouters = require('./routes/subscribers');
app.use('/subscribers', subscribersRouters);

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("Connected to Database");
});

app.listen(3000, () => console.log("Server started on port 3000"));
