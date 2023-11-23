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
router.get('/article/list', ctrlArticles.getActiveMdArticleList);
router.get('/article/list/all', auth, ctrlArticles.getAllMdArticleList);
router.get('/article', ctrlArticles.getMdArticleById);
router.get('/article/file', ctrlArticles.getDefMdArticleModelName); //TODO: add authentication
router.get('/article/models', ctrlArticles.getAllActiveMdArticleModels);
router.post('/article/update', auth, ctrlArticles.updateMdArticleById);
router.post('/article/upload', auth, ctrlArticles.uploadDefModel);


/** 
 * Models
 */
router.post('/model/upload', auth, ctrlModels.uploadModel);
router.post('/model/verify', auth, ctrlModels.verifyMdModel);
router.post('/model/add', auth, ctrlModels.addMdModel);
router.get('/model', ctrlModels.getMdModelById);  //TODO: add authentication
router.get('/model/user', auth, ctrlModels.getMdModelsByUser);
router.get('/model/file', ctrlModels.getActiveMdModelName);  //TODO: add authentication
router.get('/model/all', auth, ctrlModels.getAllMdModels);
router.get('/model/unverified', auth,  ctrlModels.getUnverifiedMdModels);
router.get('/model/download', ctrlModels.downloadMdModel); //TODO: add authentication

/**
 * User
 */
router.get('/user', ctrlUsers.getUserByName); // TODO: add authentication ?
router.get('/user/id', ctrlUsers.getUserById); // TODO: add authentication ?

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