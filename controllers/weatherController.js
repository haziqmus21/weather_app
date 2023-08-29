const Weather = require("../models/weather");
const axios = require("axios");

exports.addWeather = async (req, res) => {
  if (req?.body?.city) {
    try {
      const existingWeather = await Weather.findOne({ city: req.body.city });

      if (existingWeather) {
        return res
          .status(400)
          .json({ message: "Weather data for this city already exists!" });
      }

      const newWeather = new Weather({
        city: req.body.city,
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        windSpeed: req.body.windSpeed,
      });

      await newWeather.save();
      res
        .status(201)
        .json({ message: "City added successfully!", data: newWeather });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding city", error: error.message });
    }
  } else {
    res.status(500).json({ message: "city is a required fiels" });
  }
};

exports.getAllWeather = async (req, res) => {
  try {
    const allCities = await Weather.find();
    res.status(200).json(allCities);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cities", error: error.message });
  }
};

exports.getWeatherById = async (req, res) => {
  try {
    const weather = await Weather.findById(req.params.id);

    if (!weather) {
      return res.status(404).json({ message: "Invalid id, not found!" });
    }

    res.status(200).json(weather);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching weather data", error: error.message });
  }
};

exports.updateWeatherById = async (req, res) => {
  try {
    const updatedWeather = await Weather.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedWeather) {
      return res.status(404).json({ message: "Invalid id, not found!" });
    }

    res
      .status(200)
      .json({ message: "Weather data updated!", data: updatedWeather });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating weather data", error: error.message });
  }
};

exports.deleteWeatherById = async (req, res) => {
  try {
    const deletedWeather = await Weather.findByIdAndDelete(req.params.id);

    if (!deletedWeather) {
      return res.status(404).json({ message: "City not found!" });
    }

    res.status(200).json({ message: "City deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting city", error: error.message });
  }
};

exports.initializeDatabase = async () => {
  const count = await Weather.countDocuments();
  if (count === 0) {
    console.log("Database Initialization: Start!");
    const cities = ["London", "New York", "Tokyo", "Berlin"];
    for (let city of cities) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`
        );
        const { temp, humidity } = response.data.main;
        const windSpeed = response.data.wind.speed;

        const newWeather = new Weather({
          city,
          temperature: temp,
          humidity,
          windSpeed,
        });

        await newWeather.save();
      } catch (e) {
        console.log(`Database Initialization Error: Adding ${city}`);
        console.log(e);
      }
    }
    console.log("Database Initialization: Finished!");
  } else {
    console.log("No need Database Initialization");
  }
};
