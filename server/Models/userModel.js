const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const MONGO_URI = 'mongodb+srv://jdarmada:IDhZTT1neBqRK7Jj@cluster0.dogx99a.mongodb.net/?retryWrites=true&w=majority'


const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    currentItinerary: {type: Array}
});


const UserModel = model('User', UserSchema);


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to Database'));

module.exports = UserModel