// modules
import mongoose from 'mongoose';


// Schema constructor
const { Schema } = mongoose;

const photoSchema = new Schema(
    {
        image: {
			type: String,
			trim: true,
			required: true,
		},
        title: {
			type: String,
			trim: true,
			required: true,
		},
        likes: Array,
        comments: Array,
        user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
    },
    {

    timestamps: true

    }
);

// Model
const PhotoModel = mongoose.model('Photo', photoSchema);

export default PhotoModel;

