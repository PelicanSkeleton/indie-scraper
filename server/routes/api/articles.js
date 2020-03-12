const router = require("express").Router();
const articleController = require("../../controllers/articleController");

router
    .route("/scrape-barsuk")
    .get(articleController.scrapeBarsuk);

router
    .route("/scrape-dischord")
    .get(articleController.scrapeDischord);

router
    .route("/scrape-jadetree")
    .get(articleController.scrapeJadetree);

router
    .route("/scrape-subpop")
    .get(articleController.scrapeSubpop);

router
    .route("/scrape-polyvinyl")
    .get(articleController.scrapePolyvinyl);

router
    .route("/scrape-topshelf")
    .get(articleController.scrapeTopshelf);

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
