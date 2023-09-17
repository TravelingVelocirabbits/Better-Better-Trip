const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const MONGO_URI = 'mongodb+srv://jdarmada:IDhZTT1neBqRK7Jj@cluster0.dogx99a.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to Database'));



const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  });

const User = mongoose.model('User', UserSchema)


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
      // image: String,
      // stars: Number,
    }
  ],
  restaurants: [
    {
      id: Number,
      name: String,
      distance: Number,
      bearing: String,
      address: String, 
      // image: String,
      // stars: Number,
    }
  ],
  attractions: [
    {
      id: Number,
      name: String,
      distance: Number,
      bearing: String,
      address: String, 
      // image: String,
      // stars: Number,
    }
  ]
})

const Location = mongoose.model('Location', LocationSchema)

  
  module.exports = {
    User,
    Location,
  }
  