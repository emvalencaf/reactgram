const mongoose = require('mongoose');

//users
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// connection with Mongoose

const connectDB = async () => {

    try{

        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.qyfu2z0.mongodb.net/?retryWrites=true&w=majority`
        );

        console.log('conectou ao banco no mongoDB')

        return dbConn;

    }catch(err){

        console.error(err);

    };

};

module.exports = connectDB;