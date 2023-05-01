const express = require("express");
const router = express.Router();

const ctrlArticles = require("../controllers/article");
const ctrlModels = require("../controllers/model");

/**
 * Articles
 */
router.get('/article/list', ctrlArticles.getMdArticleList);

/**
 * Models
 */
router.post('/model/upload', ctrlModels.uploadModel);
router.post('/model/add', ctrlModels.addMdModel);

/** TODO: DELETE THIS
 * Test
 */
router.get('/test', ctrlModels.testPathNames);

module.exports = router; 