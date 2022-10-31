// modules
const express = require("express");

// Router
const router = express.Router();


// Controller
const {
    insertPhoto,
    deletePhoto,
    getAllPhotos
 } = require('../../controllers/Photo.controller');

// Middlewares
const validate = require('../../middlewares/handleValidation.middleware');

const {
    imageUpload
} = require('../../middlewares/imageUpload');

const { photoInsertValidation } = require("../../middlewares/photoValidation.middleware");

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

module.exports = router;