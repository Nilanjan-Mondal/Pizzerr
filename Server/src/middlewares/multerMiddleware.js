const multer = require('multer');
const path = require('path');

const storageConfig = multer.diskStorage({

    // create a folder named uploads in the root directory then this destination will store the file in that folder
    destination: (req, file, next) => {
        next(null, 'uploads/');
    },
    // next is an error first callback
    filename: (req, file, next) => {
        console.log(file);
        next(null, `${Date.now()}${path.extname(file.originalname)}`); 
        //extname is a method that will return the extension of the file
        //.originalname is a property of the file object that will return the original name of the file
    }
});

const uploader = multer({ 
    storage: storageConfig 
});

module.exports = uploader;