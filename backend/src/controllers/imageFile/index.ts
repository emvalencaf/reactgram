// repository
import ImageFileRepository from "../../repository/imageFile";

// types
import { Request } from "express";

export default class ImageFileController {
	// uploads an image file in cloudinary storage
	static async upload(user: Request["user"], file: Express.Multer.File): Promise<string> {
		// configure the folder path to uploads image
		const folderPath = `${user?.id}/images`;
		const filename = `${Date.now()}+_${file.originalname}`;

		return new Promise<string>((resolve, reject) => {
			const uploadStream = ImageFileRepository.upload(folderPath, filename, true, file, (err, result) => {
				if (err) {
					console.log(`[server]: error uploading file: `, err);
					reject(err);
				} else if (!result) {
					console.log("[server]: wasn't able to upload the image");
				} else {
					console.log("[server]: file was uploaded successfully at: ", result?.secure_url);
					resolve(result?.secure_url);
				}
			});

			const fileStream = file.stream;
			fileStream.pipe(uploadStream);
		});
	}
}
