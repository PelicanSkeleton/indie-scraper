const express = require("express");
const router = express.Router();
const articleRoutes = require("./articles");
const userRoutes = require("./users");

router.use("/articles", articleRoutes);
router.use("/users", userRoutes);

module.exports = router;