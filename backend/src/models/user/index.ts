// modules
import mongoose from "mongoose";
import { IUserModel } from "../../shared-types/user";

// Schema constructor
const { Schema } = mongoose;

const userSchema = new Schema<IUserModel>(
    {
        name: {
			type: String,
			trim: true,
			required: true,
			maxLength: 50,
			minLength: 3,
		},
        email: {
			type: String,
			trim: true,
			required: true,
			maxLength: 50,
			minLength: 3,
		},
        password: {
			type: String,
			trim: true,
			required: true,
			minLength: 5,
		},
        profileImage: {
			type: String,
			trim: true,
			required: false,
		},
        bios: {
			type: String,
			trim: true,
			required: false,
		}
    },{
        timestamps: true
    }
);

// Model
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
