// types
import { Document } from "mongoose";

export interface IUserModel extends Document {
	name: string;
	email: string;
	password: string;
	profileImage?: string;
	bios?: string;
}
