require("dotenv").config();
const initializeDatabase = require("./lib/db");

const express = require("express");
const mongoose = require("mongoose");
const weatherController = require("./controllers/weatherController");

const app = express();

initializeDatabase();
app.use(express.json());
app.use("/", require("./router/route"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${process.env.PORT || 3000}`);
});
