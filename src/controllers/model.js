const { EntityData } = require('../models/db');
const { MutlerManager, StorageManager } = require('../models/lib');


var storage = MutlerManager.mutlerStorage(StorageManager.UPLOADS_DIRECTORY);
var upload = MutlerManager.mutlerUpload(storage)

//TODO: add 500 response and 400 response

async function addMdModel(req, res) {

    let raw_response = await EntityData.addMdModel(req);


    let out = {}
    out.DATA = raw_response.DATA;

    res.status(200).send(out);

}

async function uploadModel( req , res){


    // TODO: return meaningful information
    upload(req, res, async function(err) {
        if(err) {
            console.log(err);
            res.end("Error uploading");
        }
        else {

            // activate the model
            test = await EntityData.activateModel(req);

            res.end("File is uploaded");
        }
        
    });

}

async function testPathNames( req , res){

    var data = {}

    data.DATA = StorageManager.UPLOADS_DIRECTORY

    res.status(200).json(data);
}



module.exports = {
    uploadModel,
    addMdModel,
    testPathNames
}