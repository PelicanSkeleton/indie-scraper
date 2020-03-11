const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router
    .route("/saved-article/:id")
    .get(userController.getSavedArticles)
    .put(userController.addSavedArticle);

router
    .route("/saved-article/remove/:id")
    .put(userController.removeSavedArticle);

module.exports = router;