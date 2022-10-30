// modules
const express = require("express");

// Router
const router = express.Router();

// Controller
const { register } = require('../../controllers/User.controller');

// Middlewares
const validate = require('../../middlewares/handleValidation.middleware');

// routes
router.post('/register', validate, register);

module.exports = router;