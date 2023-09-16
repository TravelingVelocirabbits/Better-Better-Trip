const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/userModel')

mongoose.connect('mongodb+srv://jdarmada:IDhZTT1neBqRK7Jj@cluster0.dogx99a.mongodb.net/?retryWrites=true&w=majority');


app.use(express.json());

app.use(cors());

app.post('/profile', async(req, res) =>{
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({username, password})
        res.json(userDoc)
    } catch(err) {
        res.status(400).json(err)
    }

 })

app.listen(3000, () => {
    console.log(`SERVER RUNNING!`);
});

module.exports = app;