const db = require('../models/db');
const multer = require("multer");
const path = require('path');




var storage = multer.diskStorage({
	destination: (req,file,callback)=> {
		callback(null,path.join(__dirname + '\\..\\uploads'));
        console.log(path.join(__dirname + '\\..\\uploads'));
	},
	filename: (req,file,callback)=> {
		callback(null, Date.now() + file.originalname);
	}
});

var upload = multer({
	storage: storage,
	fileFilter: (req,file,callback)=> {  
        let ext = path.extname(file.originalname);
        if(ext == '.zip' || ext == '.txt') {
            console.log('Extension Check');
            callback(null,true);
        }
        else {
            callback('Only .zip are allowed', false);
        }
	}
}).single('file');



async function uploadTest( req , res){

    upload(req, res, function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading");
        }
        res.end("File is uploaded");
    });

}



module.exports = {
    uploadTest,
}