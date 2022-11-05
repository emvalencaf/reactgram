// models
const controller = require("../controllers/User.controller");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// AUTH
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if header has a token
    if(!token) return res.status(401).json({errors:["Acesso negado!"]});

    // Check if token is valid
    try{
        
        const verified = jwt.verify(token, jwtSecret);

        console.log(verified);

        req.user = await User.findById(verified.id).select('-password');
        console.log(req.user);
        next();

    } catch(err){

        res.status(400).json({errors:["Token inválido"]});

    };
};

module.exports = authGuard;