// modules
const express = require("express");

// Router
const router = express.Router();


// Controller
const {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto
 } = require('../../controllers/Photo.controller');

// Middlewares
const validate = require('../../middlewares/handleValidation.middleware');

const {
    imageUpload
} = require('../../middlewares/imageUpload');

const { 
    photoInsertValidation,
    photoUpdateValidation,
    commentValidation
} = require("../../middlewares/validation/Photo.validation");

    // AUTH
const authGuard = require('../../middlewares/authGuard.middleware');

// Routes
router.post('/',
    authGuard,
    imageUpload.single('image'), photoInsertValidation(),
    validate,
    insertPhoto
);

router.delete('/:id', authGuard, deletePhoto);

router.get('/',
    authGuard,
    getAllPhotos
);

router.get('/user/:id',
    authGuard,
    getUserPhotos
);

router.get('/:id',
    authGuard,
    getPhotoById
);

router.put('/:id',
    authGuard,
    photoUpdateValidation(),
    validate,
    updatePhoto
);

router.put('/like/:id',
    authGuard,
    likePhoto
);

router.put('/comment/:id',
    authGuard,
    commentValidation(),
    validate,
    commentPhoto
);

module.exports = router;