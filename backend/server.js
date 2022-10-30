require('dotenv').config();

const app = require('./src/app');


const PORT = process.env.PORT || 3000;

const main = () => {

    app.listen(PORT, () => {

        console.log(`O app está rodando na porta ${PORT} e na url: http://localhost:${PORT}/`);

    });

};

main();