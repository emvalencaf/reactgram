// modules
const express = require("express");

// Router
const router = express.Router();

// Controller
const {
    register,
    login,
    getCurrentUser
} = require('../../controllers/User.controller');

// Middlewares
    // validation
const validate = require('../../middlewares/handleValidation.middleware');
const { 
    userCreateValidation,
    loginValidation
} = require('../../middlewares/validation/User.validation');
    // auth
const authGuard = require("../../middlewares/authGuard.middleware");

// routes
router.post('/register', userCreateValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);
router.get('/profile', authGuard, getCurrentUser);

module.exports = router;