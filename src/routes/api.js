const express = require("express");
const router = express.Router();

const ctrlArticles = require("../controllers/article");
const ctrlModels = require("../controllers/model");

/**
 * Articles
 */
router.get('/articles', ctrlArticles.getTest);

/**
 * Models
 */
router.post('/model/new', ctrlModels.uploadTest);



module.exports = router; 