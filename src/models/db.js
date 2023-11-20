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

    connection.close();

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
  static COLUMN_07 = "c07";
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
    qry += " ,"+ SyUser.isAdmin +" ";
  
    qry += "  FROM " + SyUser.table + " ";

    qry += "  WHERE " + SyUser.name +" = :n ";
    qry += "  AND " + SyUser.isActive +" = 1 ";


    params["n"] = name;

    const out = await Db.query(qry,params);

    return out;

  }

  static async getSyUserById(req){

    let params = {};

    let qry = "";

    qry += "  SELECT ";
    qry += "  "+ SyUser.id +" ";
    qry += " ,"+ SyUser.name +" ";
    qry += " ,"+ SyUser.isAdmin +" ";
  
    qry += "  FROM " + SyUser.table + " ";

    qry += "  WHERE " + SyUser.id +" = :i ";
    qry += "  AND " + SyUser.isActive +" = 1 ";


    params["i"] = req.query.id;

    const out = await Db.query(qry,params);

    return out;

  }

  static async getMdArticleById(req){

    let params = {};

    let qry = "";

    qry += "  SELECT ";
    qry += "  "+ MdArticle.id +" ";
    qry += " ,"+ MdArticle.name +" ";
    qry += " ,"+ MdArticle.file +" ";
    qry += " ,"+ MdArticle.dimId +" ";
    qry += " ,"+ MdArticle.desc +" ";

    qry += "  FROM " + MdArticle.table + " ";

    qry += "  WHERE " + MdArticle.id +" = :i ";


    params["i"] = req.query.aid;

    const out = await Db.query(qry,params);

    return out;

  }

  static async getMdModelById(req){

    let params = {};

    let qry = "";

    qry += "  SELECT ";
    qry += "  "+ MdModel.id +" ";
    qry += " ,"+ MdModel.name +" ";
    qry += " ,"+ MdModel.syUserId +" ";
    qry += " ,"+ MdModel.articleId +" ";
    qry += " ,"+ MdModel.file +" ";
    qry += " ,"+ MdModel.weight +" ";
    qry += " ,"+ MdModel.isActive +" ";

    qry += "  FROM " + MdModel.table + " ";

    qry += "  WHERE " + MdModel.id +" = :i ";


    params["i"] = req.query.mid;


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


  static async getMdArticleDefaultModel(req){
    let params = {};

    let qry = "";
    
    qry += "  SELECT ";
    qry += "  "+ MdArticle.file +" ";
  
    qry += "  FROM " + MdArticle.table + " ";

    qry += "  WHERE " + MdArticle.id +" = :i ";


    params["i"] = req.query.aid;

    const out = await Db.query(qry, params);
    return out;


  }


}

class ListData {

  static async getMdArticleAciveFiles(req){
    let params = {};

    let qry = "";

    qry += "  SELECT ";
    qry += "  "+ MdModel.id +" ";
    qry += " ,"+ MdModel.name +" ";
    qry += " ,"+ MdModel.file +" ";
    qry += " ,"+ MdModel.weight +" ";
    qry += " ,"+ MdModel.isActive +" ";
    qry += " ,"+ MdModel.syUserId +" ";
    qry += " ,"+ MdModel.articleId +" ";
  
    qry += "  FROM " + MdModel.table + " ";

    qry += "  WHERE " + MdModel.articleId +" = :ai ";
    qry += "  AND " + MdModel.weight +" > 0 ";
    qry += "  AND " + MdModel.isActive +" = 1 ";
    qry += "  AND " + MdModel.isVerified +" = 1 ";

    params["ai"] = req.query.aid;

    const out = await Db.query(qry, params);
    return out;

  }


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

  static async getMdModelList(req) {


    let params = {}

    let fltr = req.query.filter;



    let qry = "";

    qry += "  SELECT ";
    qry += "  m."+ MdModel.id +" ";
    qry += " ,m."+ MdModel.name +" ";
    qry += " ,m."+ MdModel.isActive +" ";
    qry += " ,s."+ SyUser.name +" ";
  
    qry += "  FROM " + MdModel.table + " AS m ";
    qry += "      ," + SyUser.table + " AS s ";

    qry += "  WHERE m." + MdModel.id +" > 1 ";
    qry += "  AND m." + MdModel.syUserId +" = s." + SyUser.id +" ";

    if (fltr != null && fltr != "") {
      
      qry += "  AND " + MdModel.name +" ";
      qry += "  LIKE :f ";
      params["f"] = Db.prepareLikeParam(fltr);

    }

    qry += "  ORDER BY " + MdModel.id + " ";
  
  
    const out = await Db.query(qry,params);
    return out;

  }
  

  static async getUnverifiedMdModelList(req) {


    let params = {}

    let fltr = req.query.filter;



    let qry = "";

    qry += "  SELECT ";
    qry += "  m."+ MdModel.id +" ";
    qry += " ,m."+ MdModel.name +" ";
    qry += " ,m."+ MdModel.isActive +" ";
    qry += " ,s."+ SyUser.name +" ";
  
    qry += "  FROM " + MdModel.table + " AS m ";
    qry += "      ," + SyUser.table + " AS s ";

    qry += "  WHERE m." + MdModel.id +" > 1 ";
    qry += "  AND m." + MdModel.isVerified +" = 0 ";
    qry += "  AND m." + MdModel.syUserId +" = s." + SyUser.id +" ";

    if (fltr != null && fltr != "") {
      
      qry += "  AND " + MdModel.name +" ";
      qry += "  LIKE :f ";
      params["f"] = Db.prepareLikeParam(fltr);

    }

    qry += "  ORDER BY " + MdModel.id + " ";
  
  
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
    static isVerified = "MD_MODEL_ISVERIFIED";
}

class MdCust {
  static table = "md_cust";

  static id = "MD_CUST_ID";
  static name = "MD_CUST_NAME";
  static desc = "MD_CUST_DESC";
  static date = "MD_CUST_DATE";
  static isActive = "MD_CUST_ISACTIVE";
}

class SyUser {
    static table = "sy_user";

    static id = "SY_USER_ID";
    static name = "SY_USER_NAME";
    static hash = "SY_USER_HASH";
    static salt = "SY_USER_SALT";
    static isActive = "SY_USER_ISACTIVE";
    static isAdmin = "SY_USER_ISADMIN";
}

class TGr {
  static table = "t_gr";

  static id = "T_GR_ID";
  static time = "T_GR_TIME";
  static custId = "MD_CUST_ID";
  static articleId = "MD_ARTICLE_ID";
}






module.exports = {
  Db,
  MdArticle,
  MdArticleDim,
  MdModel,
  MdCust,
  SyUser,
  TGr,
  ListData,
  EntityData,
  PageData

}