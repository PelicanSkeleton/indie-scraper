const router = require("express").Router();
const articleController = require("../../controllers/articleController");
const noteController = require("../../controllers/noteController");

// router
//     .route("/scrape-barsuk")
//     .get(articleController.scrapeBarsuk);

router
    .route("/scrape")
    .get(articleController.scrapeDischord);

// router
//     .route("/scrape-jadetree")
//     .get(articleController.scrapeJadetree);

// router
//     .route("/scrape-subpop")
//     .get(articleController.scrapeSubpop);

// router
//     .route("/scrape-polyvinyl")
//     .get(articleController.scrapePolyvinyl);

// router
//     .route("/scrape-topshelf")
//     .get(articleController.scrapeTopshelf);

router
    .route("/saved-articles")
    .get(articleController.savedArticles);

router
    .route("/")
    .get(articleController.getAllArticles);

router
    .route("/:id")
    .get(articleController.getArticlesById)
    .post(noteController.create)
    .delete(articleController.remove);

router
    .route("/notes/:id")
    .put(articleController.removeNote);

module.exports = router;
