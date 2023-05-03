const express = require("express");
const router = express.Router();

const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
  secret: "superSecretPassword",
  userProperty: "payload",
  algorithms: ["HS256"],
});

const ctrlArticles = require("../controllers/article");
const ctrlModels = require("../controllers/model");
const ctrlAuth = require("../controllers/authentication");
//TODO: this is for testing
const ctrlTest = require("../controllers/test");

/**
 * Articles
 */
router.get('/article/list', ctrlArticles.getMdArticleList);

/**
 * Models
 */
router.post('/model/upload',auth, ctrlModels.uploadModel);
router.post('/model/add', auth,ctrlModels.addMdModel);

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

module.exports = router; 