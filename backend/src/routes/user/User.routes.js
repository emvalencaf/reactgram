// modules
const express = require("express");

// Router
const router = express.Router();

// Controller
const {
    register,
    login,
    getCurrentUser,
    updateUser,
    getUserById
} = require('../../controllers/User.controller');

// Middlewares

    // validation
        // handle validation
const validate = require('../../middlewares/handleValidation.middleware');

        // request's fields validation
const { 
    userCreateValidation,
    loginValidation,
    userUpdateValidation
} = require('../../middlewares/validation/User.validation');

    // auth
const authGuard = require('../../middlewares/authGuard.middleware');

    // image
const { imageUpload } = require('../../middlewares/imageUpload');


// routes

router.post('/register',
    userCreateValidation(),
    validate,
    register
);


router.post('/login',
    loginValidation(),
    validate,
    login
);


router.get(
    '/profile',
    authGuard,
    getCurrentUser
);


router.put('/',
    authGuard,
    userUpdateValidation(),
    validate,
    imageUpload.single('profileImage'),
    updateUser
);

router.get("/:id", getUserById);


module.exports = router;