const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// config JSON and form data response
app.use(express.json());// to work with json
app.use(express.urlencoded({extended: false}));// to work with form data

// Solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));// if API and front-end will run in different domains get this line commented.

// Upload directory
app.use('/uploads', express.static(pathjoin(__dirname, '/uploads')));// in this directory will be saved the photos of our project



// routes
const router = require('./routes/Router.route');

app.use(router);

module.exports = app;