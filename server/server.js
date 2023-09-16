const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const User = require('./Models/userModel')
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// app.use(express.static(path.resolve(__dirname, '../client')));

// catch all route to serve index.html for client facing route
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// mongoose.connect('mongodb+srv://jdarmada:IDhZTT1neBqRK7Jj@cluster0.dogx99a.mongodb.net/?retryWrites=true&w=majority');



// // app.post('/profile', async(req, res) =>{
// //     const {username, password} = req.body;
// //     try{
// //         const userDoc = await User.create({username, password})
// //         res.json(userDoc)
// //     } catch(err) {
// //         res.status(400).json(err)
// //     }

// //  })

app.listen(3000, () => {
    console.log(`SERVER RUNNING!`);
});

module.exports = app;