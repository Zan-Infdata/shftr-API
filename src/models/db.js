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
}




class MdArticle {
    static table = "md_article";

    static id = "MD_ARTICLE_ID";
    static name = "MD_ARTICLE_NAME";
    static file = "MD_ARTICLE_FILE";
    static dimId = "MD_ARTICLE_DIM_ID";

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
}







module.exports = {
  Db,
  MdArticle,
  MdArticleDim,
  MdModel,
  SyUser,
}