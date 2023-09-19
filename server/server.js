const express = require('express');
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/userModel')
const userRouter = require('./routers/userRouter')
const apiRouter = require('./routers/apiRouter')
const cookieParser = require('cookie-parser')

const MONGO_URI = 'mongodb+srv://connorelikeyes:D36U8CGSL5maEh9h@cluster0.vxtr5rx.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors({credentials:true, origin: 'http://localhost:8080'}));

app.use(cookieParser())

//router for user info requests
app.use('/user', userRouter, (req, res) => {

    console.log('hi from user router')

    return res.sendStatus(200)


})

app.use('/api', apiRouter, (req, res) => {
    return res.sendStatus(201);
})

// catch all route to serve index.html for client facing route
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

 // LOCAL ERROR HANDLER
 app.use('/', (req, res) => {
    return res.sendStatus(404)
 })

 // GLOBAL ERROR HANDLER
 app.use('/', (err, req, res, next) => {
    const defaultError = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: {err: 'An error occurred'},
    };

    const customError = Object.assign(defaultError, err);

    return res.status(customError.status).json(customError.message);
 })



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