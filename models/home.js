// Core Modules
const { ObjectId } = require("mongodb");
const mongoose = require('mongoose')

const Favourite = require("./favourite")

const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports  = mongoose.model("Home" , homeSchema)

