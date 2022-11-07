// Models
const fs = require('fs');
const path = require('path');


const deleteFile = (folder, filename) => {

    const filePath = path.join(path.join(__dirname, '..', '..', 'uploads', folder, filename));

    if(!fs.existsSync(filePath)) return console.log('There is no file in this path');

    fs.unlink(filePath, (err) =>{
       if(err) throw err;
       
       console.log('Delete file successfully');
    });

};

module.exports = {
    deleteFile
};