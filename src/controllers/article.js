const { ListData, PageData, MdArticle, EntityData } = require('../models/db');
const path = require('path');
// TODO: add 500 response

async function getMdArticleList( req , res){
  

  let raw_response = await ListData.getMdArticleList(req);
  
  let response = [];

  for (i in raw_response.DATA){
    let item = raw_response.DATA[i];

    let row = {};
    
    // TODO: add description
    row[PageData.COLUMN_01] = item[MdArticle.id];
    row[PageData.COLUMN_02] = item[MdArticle.name];

    

    response.push(row);
  }


  out = {}
  out.DATA = response
  out.CNT = response.length

  res.status(200).send(out);

}

async function getDefMdArticleModelName(req , res){


  let raw_response = await EntityData.getMdArticleDefaultModel(req);

  let fileName = raw_response.DATA[0][MdArticle.file];

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



module.exports = {
  getMdArticleList,
  getDefMdArticleModelName
}