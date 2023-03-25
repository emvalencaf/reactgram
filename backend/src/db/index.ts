// modules
import mongoose from "mongoose";


// loading environments variables
const mongoDBURL = process.env.DB_URL || "";
const dbUser = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";

// connection with Mongoose

const connectDB = async () => {

    try{

		// db url
		const dbURL: string = `mongodb+srv://${dbUser}:${dbPassword}${mongoDBURL}`;

		// connecting with MongoDB
        const dbConn = await mongoose.connect(dbURL);

        console.log('[server]: connected to MongoDB database');

        return dbConn;

    }catch(err){
        console.error(err);
    };
};

export default connectDB;
