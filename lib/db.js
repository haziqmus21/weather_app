const mongoose = require("mongoose");
const weatherController = require("../controllers/weatherController");

const initializeDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      // Check and initialize the database if needed
      weatherController.initializeDatabase();
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
};

module.exports = initializeDatabase;
