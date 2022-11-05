// modules
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
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
const register = async (req, res) => {

    console.log("entramos no controller register");
    const { name, email, password } = req.body;

    // check if user exists
    const user = await User.findOne({email});
    console.log("Checamos se existe um usuário com o mesmo e-mail");

    if(user) return res.status(422).json({errors:["Por favor, utilizar um e-mail não registrado."]});

    // Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //const passwordHash = encryptPassword(password);
    console.log("geramos um password hash");
    // Create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    });
    // if user was created sucessfully, return the token
    if(!newUser) return res.status(422).json({errors:["Houve um erro, por favor tente mais tarde."]});
    
    console.log("criamos um usuário no banco de dados");
    // send new user id and token to frontend
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    });
    
    console.log("enviamos o token e o id do usuário ao frontend");

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

    console.log('entramos no getCurrentUser');

    const user = req.user;
    console.log('user', user);

    res.status(200).json(user);

};

// encrypt passoword

const encryptPassword =  async (password) => {

    console.log('entrou na encryptPassword');

    const salt = await bcrypt.genSalt();

    console.log('gerou o salt?', salt);

    return await bcrypt.hash(password, salt);

};

// Update an user
const updateUser = async(req, res) => {

    const { name, password, bio } = req.body;

    let profileImage = null;

    if(req.file) {
        profileImage = req.file.filename;
    };

    // User's data get by the authGuard
    const reqUser = req.user

    const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password");

    if(name) user.name = name;

    if(password) {
        const passwordHash = await encryptPassword(password);
        user.password = passwordHash;
    };

    if(profileImage) user.profileImage = profileImage;

    if(bio) user.bio = bio;

    await user.save();

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