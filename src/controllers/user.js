const { EntityData, PageData, SyUser } = require('../models/db');
const { sStorageManager } = require('../models/lib');


async function getUserByName(req, res) {

    let response = [];
    let row = {};

    if (req.query.uname === undefined) {
        row["message"] = "No parameter found";
        response.push(row);

        out = {}
        out.DATA = response;
        out.CNT = response.length;
        
        res.status(400).send(out);
    }
    else {
        
        let raw_response = await EntityData.getSyUserByName(req.query.uname);

        if (raw_response.DATA.length == 0){
    
            row["message"] = "No User found";
            response.push(row);
    
            out = {}
            out.DATA = response;
            out.CNT = response.length;
            
            res.status(404).send(out);
        }
        else {
    
            const user = raw_response.DATA[0];
    
            row[PageData.COLUMN_01] = user[SyUser.id];
            row[PageData.COLUMN_02] = user[SyUser.name];
            row[PageData.COLUMN_03] = user[SyUser.isAdmin];
    
            response.push(row);
    
            out = {}
            out.DATA = response;
            out.CNT = response.length;
    
            res.status(200).send(out);  
        }
    }    

};







module.exports = {
    getUserByName,
}