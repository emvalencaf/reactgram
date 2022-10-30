// modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
    // model
const User = require('../models/User.model');

// AUTH
const jwtSecret = process.env.JWT_SECRET;

    // Generate user token
const generateToken = (id) => {

    return jwt.sign(
            {id},
            jwtSecret,
            {
                expiresIn: '7d'
            }
        );

};

// Controller
    // Register user and sign in
const register = async(req, res) => {

  res.send('Registro');  

};

module.exports={
    register,
}