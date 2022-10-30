const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// config JSON and form data response
app.use(express.json());// to work with json
app.use(express.urlencoded({extended: false}));// to work with form data

module.exports = app;