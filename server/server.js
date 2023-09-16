const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/userModel')
const userRouter = require('./routers/userRouter')

const apiRouter = require('./routers/apiRouter')

mongoose.connect('mongodb+srv://jdarmada:IDhZTT1neBqRK7Jj@cluster0.dogx99a.mongodb.net/?retryWrites=true&w=majority');


app.use(express.json());

app.use(cors());

//router for user info requests
app.use('/user', userRouter, (req, res) => {
    return req.sendStatus(200)

})

app.use('/api', apiRouter, (req, res) => {
    return res.sendStatus(201);
})

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