// TODO: delete this controller

const { EntityData } = require('../models/db');
const { AuthManager } = require('../models/lib');


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



module.exports = {
    testPwd,
    testJwt,
    testUserByName
}