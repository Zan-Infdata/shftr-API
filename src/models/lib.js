const multer = require("multer");
const path = require('path');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const { SyUser } = require('./db');




class MutlerManager {

    static mutlerStorage(filepath){
        var out = multer.diskStorage({
            destination: (req,file,callback)=> {
                callback(null,filepath);
            },
            filename: (req,_,callback)=> {

                callback(null, FileManager.generateFileName(req.body));
            }
        });

        return out;
    }


    static mutlerUpload(strg){
        var out = multer({
            storage: strg,
            fileFilter: (req,file,callback)=> {  
                let ext = path.extname(file.originalname);
                if(ext == FileManager.FILE_EXT) {
                    console.log('Extension Check');
                    callback(null,true);
                }
                else {
                    callback('Only '+ FileManager.FILE_EXT +' are allowed', false);
                }
            }
        }).single('file');

        return out;
    }


}


class StorageManager {
    static UPLOADS_DIRECTORY = path.join( __rootname,  '\\uploads');




}

class FileManager {
    static FILE_EXT = '.glb';

    static generateFileName(body){

        var out = "";
        out += body.article + "-";
        out += body.user + "-";
        out += body.model;
        out += this.FILE_EXT;

        body.fName = out;

        return out;

    }
}

class AuthManager {

    static generatePassword(password){
        let salt = crypto.randomBytes(16).toString("hex");
        let hash = crypto
          .pbkdf2Sync(password, salt, 1000, 64, "sha512")
          .toString("hex");

        return { "salt": salt, "hash": hash };

    }

    static validatePassword(password, salt, hash){
        let checkHash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

        let out = checkHash == hash;

        return out;
    }

    // TODO: add secret to enviroment variable
    static generateJwt(user){
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 1);
        return jwt.sign(
          { id: user[SyUser.id],
            name: [SyUser.name],
            exp: parseInt(expiry.getTime() / 1000),
          },
          "superSecretPassword"
        );
    }
}



module.exports = {
    MutlerManager,
    StorageManager,
    FileManager,
    AuthManager
}