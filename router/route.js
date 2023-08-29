// weatherRoutes.js
const express = require("express");
const weatherController = require("../controllers/weatherController");

const router = express.Router();

// // Routes connected to the controllers
router.get("/initialize-database", weatherController.initializeDatabase);
router.post("/weather-data", weatherController.addWeather);
router.get("/weather-data", weatherController.getAllWeather);
router.get("/weather-data/:id", weatherController.getWeatherById);
router.patch("/weather-data/:id", weatherController.updateWeatherById);
router.delete("/weather-data/:id", weatherController.deleteWeatherById);

module.exports = router;
