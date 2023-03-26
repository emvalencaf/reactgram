declare global {
	namespace NodeJS {
		interface ProcessEnv extends NodeJS.ProcessEnv {
			PORT: number;
			// database environment variables
			DB_USER: string;
			DB_PASSWORD: string;
			DB_URL: string;

			// jwt secret
			JWT_SECRET: string;

			// storage environment variables
			CLOUDINARY_NAME: string;
			CLOUDINARY_API_KEY: string;
			CLOUDINARY_API_SECRET: string;

			// frontend url
			FRONTEND_URL: string;
		}
	}
}
