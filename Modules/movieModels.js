const mongoose = require("mongoose");

//creating schema
const movieSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required field!"],
      unique: true,
    },
    description: String,
    duration: {
      type: Number,
      required: [true, "Duration is required field!"],
    },
    ratings: {
      type: Number,
      default: 1.0,
    },
  });
  
  //creating models with schema
  const Movie = mongoose.model("Movie", movieSchema);
  
  module.exports = Movie