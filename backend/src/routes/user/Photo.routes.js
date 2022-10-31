// modules
const express = require("express");

// Router
const router = express.Router();


// Controller


// Middlewares
const validate = require('../../middlewares/handleValidation.middleware');

const { photoInsertValidation } = require("../../middlewares/photoValidation.middleware");

    // AUTH
const authGuard = require('../../middlewares/authGuard.middleware');

// Routes


module.exports = router;