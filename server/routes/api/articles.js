const router = require("express").Router();
const articleController = require("../../controllers/articleController");

router
    .route("/scrape")
    .get(articleController.scrape);

router
    .route("/saved-articles")
    .get(articleController.savedArticles);

router
    .route("/")
    .get(articleController.getArticles);

router
    .route("/:id")
    .get(articleController.getArticlesById)
    .delete(articleController.remove);

module.exports = router;
