// modules
const mongoose = require('mongoose');
const User = require('../../models/user');
const Photo = require('../../models/photo');
const fs = require('fs');
const { deleteFile } = require('../../utils/deleteFile.utils');


// Insert a photo with an user related to it
export const insertPhoto = async (req, res) => {

    const { title } = req.body;

    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    // Create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    });

    // If photo was created sucessfully, return data
    if(!newPhoto) return res.status().json({errors:['Houve um problema, por favor tente novamente mais tarde']});

    res.status(201).json(newPhoto);
};

// Remove a from DB
export const deletePhoto = async (req, res) => {

    const {id} = req.params;

    const reqUser = req.user;

    try{

        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        // Check if photo exists
        if(!photo) return res.status(404).json({errors:['Foto não encontrada!']});

        // Check if photo belongs to user
        if(!photo.userId.equals(reqUser._id)) return res.status(422).json({errors:['Ocorreu um erro, por favor tente novamente mais tarde.']});

        await Photo.findByIdAndDelete(photo._id);

        deleteFile('photos', photo.image);

        return res.status(200).json({
            id: photo._id,
            message:"Foto excluída com sucesso."
        });

    } catch(err){

        res.status(404).json({errors:['Foto não encontrada!']});
    };

};

// get all photos
export const getAllPhotos = async (req, res) => {

    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(photos);

};

// get all user photos
export const getAllUserPhotos = async (req, res) => {

    const { id } = req.params;
    console.log("dentro do backend");
    const photos = await Photo.find({userId: id})
        .sort([['createdAt', -1]])
        .exec();

    return res.status(200).json(photos);
};


// get a photo by id
export const getPhotoById = async (req, res) => {

    const { id } = req.params

    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    // Check if photo exists
    if(!photo) return res.status(404).json({errors:["Foto não encontrada."]});

    return res.status(200).json(photo);

};

// Update a photo
export const updatePhoto = async (req, res) => {

    const { id } = req.params;
    const { title } = req.body;

    const reqUser = req.user;

    const photo = await Photo.findById(id);

    // Check if photo exists
    if(!photo) return res.status(404).json({errors:["Foto não encontrada"]});

    // Check if photo belongs to user
    if(!photo.userId.equals(reqUser._id)) return res.status(422).json({errors:["Ocorreu um erro, por favor, tente novamente mais tarde."]});

    if(title) photo.title = title;

    await photo.save();

    res.status(200).json({photo, message:"Foto atualizada com sucesso."});

}

// Like functionality
export const likePhoto = async (req, res) => {

    const { id } = req.params;

    const reqUser = req.user;

    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    // Check if photo exists
    if(!photo) return res.status(404).json({errors:["Foto não encontrada."]});

    // Check if user already liked the photo
    if(photo.likes.includes(reqUser._id)) return res.status(422).json({errors:["Você já curtiu a foto"]});

    // Put user id in likes array
    photo.likes.push(reqUser._id);

    photo.save();

    res.status(200).json({
        photoId: id,
        userId: reqUser._id,
        message:"A foto foi curtida."
    });

};

// Comment functionallity
export const commentPhoto = async (req, res) => {

    const { id } = req.params;
    const { comment } = req.body;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    // Check if photo exists
    if(!photo) return res.status(404).json({errors:["Foto não encontrada."]});

    // Put comment in the comments array
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id,
        createdAt: Date.now()
    };

    photo.comments.push(userComment);

    await photo.save();

    return res.status(200).json({
        comment: userComment,
        message: 'O comentário foi adicionado com sucesso!'
    });
};

// Search photos by title
export const searchPhotosByTitle = async (req, res) => {

    const { q } = req.query;
    console.log('queryString', q);
    const photos = await Photo.find({title: new RegExp(q, 'i')}).exec();
    console.log(photos);
    res.status(200).json(photos);

};
