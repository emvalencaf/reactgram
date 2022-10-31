// Modules
const multer = require('multer');
const path = require('path');


// Destination to store image
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        
        let folder = '';

        if(req.baseUrl.includes('users')){
            folder = 'users';
        } else if(req.baseUrl.includes('photos')){
            folder = 'photos';
        };

        cb(null, `uploads/${folder}/`);
        

    },
    filename: (req, file, cb) => {
        
        //rename file - if is a big application use uuid library for shortenin' filenames.
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){

        // Upload only png and jpg formats
        if(!file.originalname.match(/\.(png|jpg)$/)) return cb(new Error('Por favor, envie apenas png ou jpg!'));

        console.log('---- on imageUpload middleware');
        console.log('file original name: ', file.originalname);
        console.log('file: ', file);
        cb(undefined, true);
    }
});

module.exports = { imageUpload };