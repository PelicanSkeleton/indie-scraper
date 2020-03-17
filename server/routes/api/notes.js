const router = require("express").Router();
const noteController = require("../../controllers/noteController");

router
    .route("/")
    .get(noteController.findAll);

router
    .route("/:id")
    .get(noteController.findById);

module.exports = router;