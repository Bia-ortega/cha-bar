var express = require("express");
var path = require("path");
var router = express.Router();

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

module.exports = router;