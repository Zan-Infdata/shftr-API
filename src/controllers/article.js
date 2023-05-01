const { ListData, PageData, MdArticle } = require('../models/db');

// TODO: add 500 response

async function getMdArticleList( req , res){
  

  let raw_response = await ListData.getMdArticleList(req);
  
  let response = [];

  for (i in raw_response.DATA){
    let item = raw_response.DATA[i];

    let row = {};
    

    row[PageData.COLUMN_01] = item[MdArticle.id];
    row[PageData.COLUMN_02] = item[MdArticle.name];

    

    response.push(row);
  }


  out = {}
  out.DATA = response
  out.CNT = response.length

  res.status(200).send(out);

}



module.exports = {
  getMdArticleList
}