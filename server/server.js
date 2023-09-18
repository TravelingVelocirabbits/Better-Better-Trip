const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://jdarmada:IDhZTT1neBqRK7Jj@cluster0.dogx99a.mongodb.net/?retryWrites=true&w=majority');


const userRouter = require('./routers/userRouter')

const apiRouter = require('./routers/apiRouter')

// const User = require('./Models/userModel')
app.use(express.json());
// Enable CORS for all routes
app.use(cors());


//router for user info requests
app.use('/user', userRouter, (req, res) => {

    console.log('hi')

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


app.listen(3000, () => {
    console.log(`SERVER RUNNING!`);
});

module.exports = app;