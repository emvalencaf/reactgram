// modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// model
const User = require('../models/User.model');
const { deleteFile } = require('../utils/deleteFile.utils');

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
const register = async (req, res) => {

    const { name, email, password } = req.body;

    // check if user exists
    const user = await User.findOne({email});

    if(user) return res.status(422).json({errors:["Por favor, utilizar um e-mail não registrado."]});

    // Generate password hash
    // const salt = await bcrypt.genSalt();
    // const passwordHash = await bcrypt.hash(password, salt);
    const passwordHash = await encryptPassword(password);

    // Create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    });
    // if user was created sucessfully, return the token
    if(!newUser) return res.status(422).json({errors:["Houve um erro, por favor tente mais tarde."]});
    
    // send new user id and token to frontend
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    });

};

    // Sign user in
const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({email});

    // Check if user exists
    if(!user) return res.status(404).json({errors:["Usuário não encontrado."]});


    // Check if password matches
    if(!(await bcrypt.compare(password, user.password))) return res.status(422).json({errors:["Senha inválida."]});

    // Return user id and token

    res.status(200).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    });


};


// Get current logged in user
const getCurrentUser = async (req, res) => {

    const user = req.user;

    res.status(200).json(user);

};

// encrypt passoword

const encryptPassword =  async (password) => {

    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password, salt);

};

// Update an user
const updateUser = async(req, res) => {
    console.log("entramos no backend");
    const { name, password, bio } = req.body;
    console.log("o servidor recebeu a requisição", req.body);
    let profileImage = null;

    if(req.file) {
        profileImage = req.file.filename;
    };

    // User's data get by the authGuard
    const reqUser = req.user
    console.log("procurado o usuário");
    const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password");

    if(name) user.name = name;

    if(password) {
        const passwordHash = await encryptPassword(password);
        user.password = passwordHash;
    };

    if(profileImage) {

        if(user.profileImage) deleteFile('users', user.profileImage);
        
        user.profileImage = profileImage;
    };

    if(bio) user.bio = bio;

    await user.save();
    console.log("salvo os dados e aatualizados")
    res.status(200).json(user);
}; 

// Get user by id
const getUserById = async (req, res) => {

    const {id} = req.params;


    try{

        const user = await User.findById(mongoose.Types.ObjectId(id)).select('-password');

        // Check if user exists
        if(!user) return res.status(404).json({errors:["Usuário não encontrado."]});
    
        res.status(200).json(user);

    } catch(err){

        res.status(404).json({errors:["Usuário não encontrado."]});

    };

};

module.exports={
    register,
    login,
    getCurrentUser,
    updateUser,
    getUserById
}