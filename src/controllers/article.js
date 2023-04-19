const db = require('../models/db');


async function getTest( _ , res){
  

  let qry = ""

  qry += "  SELECT ";
  qry += "  * ";
  qry += "  FROM " + db.MdArticle.table;


  const reposonse = await db.Db.query(qry);


  out = {}
  out.DATA = reposonse
  out.CNT = reposonse.length


  res.status(200).json(out);

}



module.exports = {
    getTest
}