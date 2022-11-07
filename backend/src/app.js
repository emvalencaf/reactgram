const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// config JSON and form data response
app.use(express.json());// to work with json
app.use(express.urlencoded({extended: false}));// to work with form data

// Solve CORS
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200}
));// if API and front-end will run in different domains get this line commented.


// routes
const router = require('./routes/Router');

app.use(router);

module.exports = app;