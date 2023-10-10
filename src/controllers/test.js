// TODO: delete this controller

const { EntityData } = require('../models/db');
const { AuthManager, FileManager } = require('../models/lib');
const path = require('path');

async function testPwd( req , res){


    response = AuthManager.generatePassword("zan");

    let data = {};
    data.DATA = response;


    res.status(200).json(data);
}

async function testJwt( req , res){


    response = AuthManager.generateJwt({"id": 1, "name": "test"});

    let data = {};
    data.DATA = response;

    res.status(200).json(data);
}

async function testUserByName( req , res){


    response = await EntityData.getSyUserByName(req.query.name);

    let data = {};
    data.DATA = response.DATA[0];

    res.status(200).json(data);
}

async function testDownload(req, res){
    var fp = path.join(__rootname, '/uploads', 'bmw_demo_def');
    fp += FileManager.FILE_EXT;
    console.log(fp);

    res.download(fp, 'test.glb');
}



module.exports = {
    testPwd,
    testJwt,
    testUserByName,
    testDownload,
}