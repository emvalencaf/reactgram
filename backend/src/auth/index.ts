// modules
import jwt from "jsonwebtoken";

// environment variables to set tokens
const jwtSecret = process.env.JWT_SECRET || "";

export const generateToken = (id: string) => {
	return jwt.sign(
		{id},
		jwtSecret,
		{
			expiresIn: "7d",
		},
	);
};

export const verifyToken = (token: string) => {
	const verified = jwt.verify(token, jwtSecret);

	if (typeof verified === "string") return;

	return verified;
};


