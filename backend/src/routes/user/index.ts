// modules
import express from "express";

// types
import { Router } from "express";

// Controller
import UserController from "../../controllers/user";


// auth middleware
import { authGuard } from "../../middlewares/authGuard";
import { uploaderMulter, uploadFileImageMiddleware } from "../../middlewares/uploadFiles/images";

// validation middleware
import validate from "../../middlewares/validation";
import {
	userCreateValidation,
	loginValidation,
	userUpdateValidation,
} from "../../middlewares/validation/user";

// file upload middleware


// Router
const router: Router = express.Router();

// routes

router.post('/sign-up',
    userCreateValidation(),
    validate,
    UserController.signUp,
);


router.post('/sign-in',
    loginValidation(),
    validate,
    UserController.signIn,
);


router.get(
    '/profile',
    authGuard,
    UserController.getCurrentUser,
);


router.put('/',
    authGuard,
    userUpdateValidation(),
    validate,
	uploaderMulter.single('profileImage'),
	uploadFileImageMiddleware,
    UserController.updateProfile,
);

router.get("/:id", UserController.getByParams);


export { router as userRouter};
