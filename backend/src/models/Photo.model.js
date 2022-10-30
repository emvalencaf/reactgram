// modules
const mongoose = require('mongoose');


// Schema constructor
const { Schema } = mongoose;

const photoSchema = new Schema(
    {
        image: String,
        title: String,
        likes: Array,
        comments: Array,
        userId: mongoose.ObjectId,
        userName: String
    },
    {

    timestamps: true

    }
);

// Model
const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;

