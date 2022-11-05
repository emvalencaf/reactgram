// modules
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = require('./src/app');
const connectDB = require('./src/db/connect.db');

// Upload directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// in this directory will be saved the photos of our project

const PORT = process.env.PORT || 3000;

const main = async () => {

    try{

        await connectDB();

        app.listen(PORT, () => {
            console.log(`O app está rodando na porta ${PORT}`);
        });

    } catch(err){

        console.error(err);

    };

};

main();