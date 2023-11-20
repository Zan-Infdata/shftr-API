const { ListData, PageData, MdArticle, EntityData, MdModel } = require('../models/db');
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

async function getAllActiveMdArticleModels(req , res){

  let raw_response = await ListData.getMdArticleAciveFiles(req);

  let response = [];
  

  for (let i = 0; i < raw_response.DATA.length; i++) {
      let row = {};
      
      let model = raw_response.DATA[i];

      row[PageData.COLUMN_01] = model[MdModel.id];
      row[PageData.COLUMN_02] = model[MdModel.name];
      row[PageData.COLUMN_03] = model[MdModel.syUserId];
      row[PageData.COLUMN_04] = model[MdModel.isActive];
      row[PageData.COLUMN_05] = model[MdModel.articleId];
      row[PageData.COLUMN_06] = model[MdModel.file];
      row[PageData.COLUMN_07] = model[MdModel.weight];

      

      response.push(row);
  }

  
  out = {}
  out.DATA = response
  out.CNT = response.length

  //TODO: maybe change the file name
  res.status(200).send(out);   
  


}

async function getMdArticleById(req , res){


  let raw_response = await EntityData.getMdArticleById(req);

  //TODO: change this error and add it to other calls
  if(raw_response.DATA.CNT == 0){
    res.status(404).send({ message: "No article found" });
  }

  let article = raw_response.DATA[0];

  let response = [];
  let row = {};
  row[PageData.COLUMN_01] = article[MdArticle.id];
  row[PageData.COLUMN_02] = article[MdArticle.name];
  row[PageData.COLUMN_03] = article[MdArticle.desc];
  row[PageData.COLUMN_04] = article[MdArticle.file];
  row[PageData.COLUMN_05] = article[MdArticle.dimId];
  response.push(row);

  out = {}
  out.DATA = response
  out.CNT = response.length

  //TODO: maybe change the file name
  res.status(200).send(out); 
}



module.exports = {
  getMdArticleList,
  getDefMdArticleModelName,
  getMdArticleById,
  getAllActiveMdArticleModels,
}