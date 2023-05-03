const { EntityData, SyUser } = require('../models/db');
const { MutlerManager, StorageManager } = require('../models/lib');


var storage = MutlerManager.mutlerStorage(StorageManager.UPLOADS_DIRECTORY);
var upload = MutlerManager.mutlerUpload(storage)

//TODO: add 500 response and 400 response

async function addMdModel(req, res) {

    // get user id
    let user = await EntityData.getSyUserByName(req.body.uname);
    req.body.uid = user.DATA[0][SyUser.id];

    let raw_response = await EntityData.addMdModel(req);


    let out = {}
    out.DATA = raw_response.DATA;

    out.DATA.userId = user.DATA[0][SyUser.id];

    res.status(200).send(out);

}

async function uploadModel(req , res){


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




module.exports = {
    uploadModel,
    addMdModel,
}