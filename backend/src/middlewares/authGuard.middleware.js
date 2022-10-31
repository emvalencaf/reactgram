// models
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { getNodeText } = require("@testing-library/react");

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

        req.user = await User.findById(verified.id).select("-password");

        next();

    } catch(err){

        res.status(401).json({errors:["Token inválido"]});

    };
};

module.exports = authGuard;