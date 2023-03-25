// Model
import { Document } from "mongoose";
import UserModel from "../../models/user";
import { IUserModel } from "../../shared-types/user";

export default class UserRepository {
	// find an user
	static async findOne(email: string, showPassword: boolean = false) {

		return showPassword ? await UserModel.findOne({
			email
		}) : await UserModel.findOne({
			email
		}).select("-password");

	}

	// sign up an user
	static async signUp({
		email,
		name,
		password,
	}: {
		email: string;
		name: string;
		password: string;
	}) {
		return await UserModel.create({
			name,
			email,
			password,
		});
	}

	// get user by an id
	static async getById(id: string, showPassword: boolean = false) {
		return showPassword ? await UserModel.findById(id) : await UserModel.findById(id).select("-password");
	}

	// update user profile
	static async updateProfile(user: IUserModel, {
		name,
		password,
		image,
		bios,
	}: {
		name: string;
		password: string;
		image: string;
		bios: string;
	}) {

		user.name = name;
		user.password = password;
		user.bios = bios;
		user.profileImage = image;

		await user.save();
	}
}
