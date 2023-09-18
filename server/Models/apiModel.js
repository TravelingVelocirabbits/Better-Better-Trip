const mongoose = require('mongoose');
const {Schema, model} = mongoose;

// Location Schema
const LocationSchema = new Schema({
  city: {type: String, required: true},
  country: {type: String, required: true},
  coords: {type: String, required: true},
  hotels: [
    {
      id: Number,
      name: String,
      distance: Number,
      bearing: String,
      address: String, 
      image: String,
      stars: Number,
    }
  ],
  restaurants: [
    {
      id: Number,
      name: String,
      distance: Number,
      bearing: String,
      address: String, 
      image: String,
      stars: Number,
    }
  ],
  attractions: [
    {
      id: Number,
      name: String,
      distance: Number,
      bearing: String,
      address: String, 
      image: String,
      stars: Number,
    }
  ]
})

const Location = mongoose.model('Location', LocationSchema)

module.exports = {
  Location,
}