const { EntityData, SyUser, MdModel, PageData, ListData, MdArticle } = require('../models/db');
const { MutlerManager, StorageManager, NumberManager } = require('../models/lib');
const path = require('path');

var storage = MutlerManager.mutlerStorage(StorageManager.UPLOADS_DIRECTORY);
var upload = MutlerManager.mutlerUploadModel(storage);



async function getMdModelById(req , res){


    let raw_response = await EntityData.getMdModelById(req);

    if(raw_response.DATA.CNT < 0){
        res.status(404).send({ message: "No model found" });
      }
  
    let model = raw_response.DATA[0];
  
    let response = [];
    let row = {};
    row[PageData.COLUMN_01] = model[MdModel.id];
    row[PageData.COLUMN_02] = model[MdModel.name];
    row[PageData.COLUMN_03] = model[MdModel.syUserId];
    row[PageData.COLUMN_04] = model[MdModel.isActive];
    row[PageData.COLUMN_05] = model[MdModel.articleId];
    row[PageData.COLUMN_06] = model[MdModel.file];
    row[PageData.COLUMN_07] = model[MdModel.weight];
    row[PageData.COLUMN_08] = model[MdModel.isVerified];
    response.push(row);
  
    out = {}
    out.DATA = response
    out.CNT = response.length
  
    //TODO: maybe change the file name
    res.status(200).send(out); 
  }


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
            // activate the mode    l
            test = await EntityData.activateModel(req);

            res.end("File is uploaded");
        }
        
    });

}

async function getAllMdModels(req , res){

    let raw_response = await ListData.getMdModelList(req);

    let response = [];


    for (let i = 0; i < raw_response.DATA.length; i++) {
        let row = {};
        
        let model = raw_response.DATA[i];

        row[PageData.COLUMN_01] = model[MdModel.id];
        row[PageData.COLUMN_02] = model[MdModel.name];
        row[PageData.COLUMN_03] = model[MdModel.isActive];
        row[PageData.COLUMN_04] = model[SyUser.name];

        response.push(row);
    }

    
    out = {}
    out.DATA = response
    out.CNT = response.length

    //TODO: maybe change the file name
    res.status(200).send(out);   
    


}


async function getMdModelsByUser(req , res){

    let raw_response = await ListData.getMdModelListByUser(req);

    let response = [];


    for (let i = 0; i < raw_response.DATA.length; i++) {
        let row = {};
        
        let model = raw_response.DATA[i];

        row[PageData.COLUMN_01] = model[MdModel.id];
        row[PageData.COLUMN_02] = model[MdModel.name];
        row[PageData.COLUMN_03] = model[MdModel.isActive];
        row[PageData.COLUMN_08] = model[MdModel.isVerified];
        row[PageData.COLUMN_09] = model[MdArticle.name];


        response.push(row);
    }

    
    out = {}
    out.DATA = response
    out.CNT = response.length

    //TODO: maybe change the file name
    res.status(200).send(out);   
    


}


async function getUnverifiedMdModels(req , res){

    let raw_response = await ListData.getUnverifiedMdModelList(req);

    let response = [];


    for (let i = 0; i < raw_response.DATA.length; i++) {
        let row = {};
        
        let model = raw_response.DATA[i];

        row[PageData.COLUMN_01] = model[MdModel.id];
        row[PageData.COLUMN_02] = model[MdModel.name];
        row[PageData.COLUMN_03] = model[MdModel.isActive];
        row[PageData.COLUMN_04] = model[SyUser.name];

        response.push(row);
    }

    
    out = {}
    out.DATA = response
    out.CNT = response.length

    //TODO: maybe change the file name
    res.status(200).send(out);   
    


}




async function getActiveMdModelName(req , res){

    let raw_response = await ListData.getMdArticleAciveFiles(req);

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


async function verifyMdModel(req , res){

    let raw_response = await EntityData.verifyMdModelById(req);

    res.status(raw_response.CODE).send(raw_response.DATA); 

}




module.exports = {
    getMdModelById,
    uploadModel,
    addMdModel,
    getAllMdModels,
    getUnverifiedMdModels,
    getActiveMdModelName,
    downloadMdModel,
    getMdModelsByUser,
    verifyMdModel,
    

}