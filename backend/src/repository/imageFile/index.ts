// repository
import cloudinary from "cloudinary";
import { v2 as storage } from "cloudinary";

export default class ImageFileRepository {
	static upload(
		folderPath: string,
		filename: string,
		metadata: boolean,
		file: Express.Multer.File,
		callback: (err: any, result: cloudinary.UploadApiResponse | undefined) => void
	) {
		return storage.uploader.upload_stream(
			{
				folder: folderPath,
				public_id: filename,
				resource_type: "image",
				image_metadata: metadata,
			},
			callback
		).end(file.buffer);
	}
}
