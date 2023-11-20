const express = require("express");
const router = express.Router();

const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],
});

const ctrlUsers = require("../controllers/user");
const ctrlArticles = require("../controllers/article");
const ctrlModels = require("../controllers/model");
const ctrlAuth = require("../controllers/authentication");
//TODO: this is for testing
const ctrlTest = require("../controllers/test");

/**
 * Articles
 */
router.get('/article/list', ctrlArticles.getMdArticleList);
router.get('/article', ctrlArticles.getMdArticleById);
router.get('/article/file', ctrlArticles.getDefMdArticleModelName); //TODO: add authentication
router.get('/article/models', ctrlArticles.getAllActiveMdArticleModels);

/**
 * Models
 */
router.post('/model/upload', auth, ctrlModels.uploadModel);
router.post('/model/add', auth, ctrlModels.addMdModel);
router.get('/model', ctrlModels.getMdModelById);  //TODO: add authentication
router.get('/model/file', ctrlModels.getActiveMdModelName);  //TODO: add authentication
router.get('/model/all', ctrlModels.getAllMdModels); //TODO: add authentication
router.get('/model/unverified', ctrlModels.getUnverifiedMdModels); //TODO: add authentication 
router.get('/model/download', ctrlModels.downloadMdModel); //TODO: add authentication

/**
 * User
 */
router.get('/user', ctrlUsers.getUserByName); //TODO: add authentication

/**
 * Authentication
 */

router.post("/login", ctrlAuth.login);

/** TODO: DELETE THIS
 * Test
 */
router.get('/test', ctrlTest.testPwd);
router.get('/test/jwt', ctrlTest.testJwt);
router.get('/test/user', ctrlTest.testUserByName);
router.get('/test/download',ctrlTest.testDownload);

module.exports = router; 