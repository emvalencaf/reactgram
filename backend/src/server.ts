// modules
import app from "./app";
import connectDB from "./db";

// which PORT will the server listining
const PORT = process.env.PORT || 3000;

const main = async () => {

    try{
		// connection with MongoDB's database
        await connectDB();

		// open server at the PORT
        app.listen(PORT, () => {
            console.log(`[server]: is running at ${PORT} port`);
        });

    } catch(err){
        console.error(err);
    };

};

main();
