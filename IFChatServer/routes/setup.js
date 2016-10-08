var express = require('express');
var router = express.Router();


var initialDatabase = "initialDatabase";
router.use('/initialDatabase', function(req, res, next) {
    var SetupController = require("../httpController/setup/SetupController");
    var ctrler = new SetupController();
    ctrler.init(req,res,next);
    ctrler[initialDatabase]();
});

module.exports = router;
