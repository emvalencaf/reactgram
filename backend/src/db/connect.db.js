const mongoose = require('mongoose');

// connection with Mongoose

const connectDB = (url) => {
    
    return mongoose.connect(url);

};

module.exports = connectDB;