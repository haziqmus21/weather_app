const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
  {
    city: String,
    temperature: Number,
    humidity: Number,
    windSpeed: Number,
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    versionKey: false,
    collection: "weather-data",
  }
);

module.exports = mongoose.model("weather-data", weatherSchema);
