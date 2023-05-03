const mysql = require('mysql2/promise');
const config = require('../../dbConfig');

class Db {

  static async query(sql, params) {
    const connection = await mysql.createConnection(config);
    let response = {};

    try{
      
      [response.DATA,] = await connection.execute(sql, params);
      response.CODE = 200;

    }
    catch (err) {
      
      response.CODE = 500
      response.DATA = err
    }

    return response;
  }


  static prepareLikeParam(param){
    return "%" + param + "%";
  }


}

class PageData {
  static COLUMN_01 = "c01";
  static COLUMN_02 = "c02";
  static COLUMN_03 = "c03";
  static COLUMN_04 = "c04"; 
  static COLUMN_05 = "c05";
  static COLUMN_06 = "c06";
}

class EntityData {


  static async getSyUserByName(name){

    let params = {};

    let qry = "";

    qry += "  SELECT ";
    qry += "  "+ SyUser.id +" ";
    qry += " ,"+ SyUser.name +" ";
    qry += " ,"+ SyUser.hash +" ";
    qry += " ,"+ SyUser.salt +" ";
  
    qry += "  FROM " + SyUser.table + " ";

    qry += "  WHERE " + SyUser.name +" = :n ";


    params["n"] = name;

    const out = await Db.query(qry,params);

    return out;

  }


  static async addMdModel(req){

    let params = {};

    let qry = ""

    qry += " INSERT INTO ";
    qry += " "  + MdModel.table + " ( ";

    qry += "  " + MdModel.name ;
    qry += " ," + MdModel.syUserId;
    qry += " ," + MdModel.isActive;    
    qry += " ," + MdModel.articleId;
    qry += " ," + MdModel.file;
    qry += " ," + MdModel.weight;
    qry += " ) ";

    qry += " VALUES ( ";
    qry += "  :n ";
    qry += " ,:sid ";
    qry += " ,:ia ";
    qry += " ,:aid ";
    qry += " ,:f ";
    qry += " ,:w ";
    qry += " ) ";


    params["n"] = req.body.modName;
    params["sid"] = req.body.uid;
    params["ia"] = 0;
    params["aid"] = req.body.artId;
    params["f"] = "";
    params["w"] = 0;

    const out = await Db.query(qry, params);
    return out

  }


  static async activateModel(req){
    let params = {};

    let qry = ""

    qry += " UPDATE ";
    qry += " "  + MdModel.table + "  ";

    qry += " SET ";
    qry += "  " + MdModel.isActive + " = :ia ";
    qry += " ," + MdModel.file + " = :f ";
    
    qry += " WHERE ";
    qry += " " + MdModel.id + " = :id ";

    params["ia"] = 1;
    params["f"] = req.body.fName;
    params["id"] = req.body.model;

    const out = await Db.query(qry, params);
    return out

  }

}

class ListData {

  static async getMdArticleList(req) {


    let params = {}

    let fltr = req.query.filter;



    let qry = "";

    qry += "  SELECT ";
    qry += "  "+ MdArticle.id +" ";
    qry += " ,"+ MdArticle.name +" ";
  
    qry += "  FROM " + MdArticle.table + " ";

    qry += "  WHERE " + MdArticle.id +" > 1 ";

    if (fltr != null && fltr != "") {
      
      qry += "  AND " + MdArticle.name +" ";
      qry += "  LIKE :f ";
      params["f"] = Db.prepareLikeParam(fltr);

    }
  
  
    const out = await Db.query(qry,params);
    return out;

  }


}



class MdArticle {
    static table = "md_article";

    static id = "MD_ARTICLE_ID";
    static name = "MD_ARTICLE_NAME";
    static file = "MD_ARTICLE_FILE";
    static dimId = "MD_ARTICLE_DIM_ID";
    static desc = "MD_ARTICLE_DESC";

}

class MdArticleDim {
    static table = "md_article_dim";

    static id = "MD_ARTICLE_DIM_ID";
    static x = "MD_ARTICLE_DIM_X";
    static y = "MD_ARTICLE_DIM_Y";
    static z = "MD_ARTICLE_DIM_Z";
}

class MdModel {
    static table = "md_model";

    static id = "MD_MODEL_ID";
    static name = "MD_MODEL_NAME";
    static file = "MD_MODEL_FILE";
    static weight = "MD_MODEL_WGHT";
    static isActive = "MD_MODEL_ISACTIVE";
    static syUserId = "SY_USER_ID";
    static articleId = "MD_ARTICLE_ID";
}

class SyUser {
    static table = "sy_user";

    static id = "SY_USER_ID";
    static name = "SY_USER_NAME";
    static hash = "SY_USER_HASH";
    static salt = "SY_USER_SALT";
}







module.exports = {
  Db,
  MdArticle,
  MdArticleDim,
  MdModel,
  SyUser,
  ListData,
  EntityData,
  PageData

}