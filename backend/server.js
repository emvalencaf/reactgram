require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/connect.db');

const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URL;

const main = async () => {

    try{
        
        await connectDB(URL);
        app.listen(PORT, () => {
            console.log(`O app está rodando na porta ${PORT}`);
        });

    } catch(err){

        console.error(err);

    };

};

main();