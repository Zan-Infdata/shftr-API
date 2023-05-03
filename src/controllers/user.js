const { EntityData } = require('../models/db');
const { MutlerManager, StorageManager } = require('../models/lib');


async function krneki(req, res) {

    let raw_response = await EntityData.addMdModel(req);


    let out = {}
    out.DATA = raw_response.DATA;

    res.status(200).send(out);

}



module.exports = {
    krneki,
}