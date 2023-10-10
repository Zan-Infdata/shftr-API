const { EntityData, SyUser, MdModel, PageData } = require('../models/db');
const { MutlerManager, StorageManager, NumberManager } = require('../models/lib');
const path = require('path');

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




async function getActiveMdModelName(req , res){

    let raw_response = await EntityData.getMdModelAciveFiles(req);

    let sum = 0;
    //sum the weights
    for (let i in raw_response.DATA){
        let item = raw_response.DATA[i];
        sum += item[MdModel.weight]; 
    }
  
    let rand = NumberManager.getRandomIntInclusive(0,sum);
  
    let outInx = -1;
    //get the index of the file
    for (let i in raw_response.DATA){
        let item = raw_response.DATA[i];
        rand -= item[MdModel.weight];

        if (!(rand>0)){
            outInx = i;
            break;
        }

    }
    // no index found
    if (outInx == -1){
        //TODO: add message
        res.send(500);
    }
    else {
        let fileName = raw_response.DATA[outInx][MdModel.file];
    

        let response = [];
        let row = {};
        row[PageData.COLUMN_01] = fileName;
        response.push(row);
      
        out = {}
        out.DATA = response
        out.CNT = response.length

        //TODO: maybe change the file name
        res.status(200).send(out);   
    }


}


async function downloadMdModel(req, res){

    let fileName = req.query.file;

    var fp = path.join(__rootname, '/uploads', fileName);
    
    //TODO: maybe change the file name
    res.download(fp, fileName);  
}




module.exports = {
    uploadModel,
    addMdModel,
    getActiveMdModelName,
    downloadMdModel,

}