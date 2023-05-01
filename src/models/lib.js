const multer = require("multer");
const path = require('path');





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



module.exports = {
    MutlerManager,
    StorageManager,
    FileManager,

}