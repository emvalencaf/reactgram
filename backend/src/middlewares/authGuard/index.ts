import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../auth";
import UserController from "../../controllers/user";

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {

	// get token from the headers request
	const authHeader = req.headers["authorization"];

	const token = authHeader && authHeader.split(" ")[1];

	// check if header has a token
	if (!token) return res.status(403).send({
		success: false,
		message: "no access token was found it",
	});

	// check if token is valid
	try {
		const verified: JwtPayload | undefined = verifyToken(token);

		const user = await UserController.getById(verified?.id);

		if (!user) return res.status(404).send({
			success: false,
			message: "user wasn't found it",
		});

		const {
			name,
			_id: id,
			email,
		} = user;

		if (!id || !email || !name) return res.status(500).send({ success: false, message: "cannot get the required fields from user document"});

		if (!verified) return res.status(500).send({
			success: false,
			message: "could not create a token",
		});

		const {
			iat,
			jwt,
			exp,
		} = verified;

		if (!iat || !jwt || !exp) res.status(500).send({
			success: false,
			message: "could not create token content",
		});

		req.user = {
			id: id.toString(),
			name,
			email,
		};

		req.token = {
			jwt: token as string,
			iat: verified.iat as number,
			exp: verified.exp as number,
		};

	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: "something wrong went on server",
		});
	}

}


/*
// models
const controller = require("../controllers/User.controller");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

// AUTH
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if header has a token
    if(!token) return res.status(401).json({errors:["Acesso negado!"]});

    // Check if token is valid
    try{

        const verified = jwt.verify(token, jwtSecret);

        console.log(verified);

        req.user = await User.findById(verified.id).select('-password');
        console.log(req.user);
        next();

    } catch(err){

        res.status(400).json({errors:["Token inválido"]});

    };
};

module.exports = authGuard;
*/
