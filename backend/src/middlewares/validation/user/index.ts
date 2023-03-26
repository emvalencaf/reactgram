import { Request } from "express";
import UserController from "../../../controllers/user";
import CryptPassword from "../../../utils/CryptPassword";

const { body } = require('express-validator');

// sign up user  validation
export const userCreateValidation = () => {

	return [

		body('name')
			.isString().withMessage("user name is a required field ")
			.isLength({ min: 3 }).withMessage('user name must have at least 3 characters')
			.isLength({ max: 50 }).withMessage("user name must have less than 50 characters")
		,
		body('email')
			.isString().withMessage("user email is a required field")
			.isEmail().withMessage("user email must be a valid email"),
		body('password')
			.isString().withMessage("user password is a required field")
			.isLength({ min: 5 }).withMessage('user password must have at least 5 characters'),
		body('confirmPassword')
			.isString().withMessage("user confirm password is a required field")
			.custom((value: string, { req }: { req: Request }) => {
				if (value != req.body.password) throw new Error("user password and confirm password fields must have equal values.");
				return true;
			})

	];

};

// sign in user validation
export const loginValidation = () => {
	return [
		body('email')
			.isString().withMessage("user email is a required field")
			.isEmail().withMessage("user email must be a valid email"),
		body('password')
			.isString().withMessage("user password is a required field")
	];
};

// update user profile validation
export const userUpdateValidation = () => {

	return [
		body('name')
			.optional()
			.isLength({ min: 3 }).withMessage('user name must have at least 3 character'),
		body('oldPassword')
			.optional()
			.isLength({ min: 5 }).withMessage('user password must have at least 5 character')
			.custom(async (value: string, { req }: {
				req: Request,
			}) => {
				// will check if user is authenticated
				if (!req.user) throw new Error("you need to be authenticated");

				// will get user from database by user authentication
				const user = await UserController.getById(req.user.id, true);

				const password = user?.password;

				if (!password) throw new Error("couldn't fetched user details");

				if (!(await CryptPassword.comparePassword(value), password)) throw new Error("incorrect password");
			}),/*
		body("newPassword")
			.isOptional()
			.isString().withMessage("user password is a required field")
			.isLength({ min: 5 }).withMessage('user password must have at least 5 characters'),
		body("confirmNewPassword")
			.isOptional()
			.isString().withMessage("user confirm new password is a required field")
			.custom((value: string, { req }: { req: Request }) => {
				if (value != req.body.password) throw new Error("user password and confirm password fields must have equal values.");
				return true;
			})*/
	]

};
