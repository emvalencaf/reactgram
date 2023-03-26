// modules
import multer, { FileFilterCallback } from "multer"
// types
import { Request, Response, NextFunction } from "express";
import ImageFileController from "../../../controllers/imageFile";

// configure multer to stora uploaded files in server memory
const multerStorage = multer.memoryStorage();

// will filter any files that's not a image
const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback
) => {
	file.mimetype.startsWith("image/") ? cb(null, true) : cb(new Error(`${file.originalname} has an invalid type file`));
}

// create a multer uploader instance
export const uploaderMulter = multer({
	storage: multerStorage,
	fileFilter: fileFilter,
});

// middleware function to handle file upload

export const uploadFileImageMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {

		if (!req?.user) return res.status(401).send({
			success: false,
			message: "you must be authenticated",
		});

		if (!req.file) return res.status(400).send({
			success: false,
			message: "no file was upload",
		});

		// upload file
		const file = req.file as Express.Multer.File;

		// will upload the image in the cloudinary storage
		const url = await ImageFileController.upload(req.user, file);

		// will add the url of the image to the body
		req.body.image = url;

		next();

	} catch (err) {
		console.log(err);
		res.status(500).send({
			success: false,
			message: "something went wrong on our server",
		});
	}
};
