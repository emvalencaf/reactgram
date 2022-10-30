// modules
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/connect.db');

const PORT = process.env.PORT || 3000;

const main = async () => {

    try{

        await connectDB();

        app.listen(PORT, () => {
            console.log(`O app está rodando na porta ${PORT}`);
        });

    } catch(err){

        console.error(err);

    };

};

main();