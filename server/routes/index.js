const path = require("path");
const router = require("express").Router();
const authRoutes = require("./auth");
const apiRoutes = require("./api");

router.use("/auth", authRoutes);
router.use("/api", apiRoutes);

router.use(function(req, res){
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;