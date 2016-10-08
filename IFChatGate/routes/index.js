var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.send('Gate Server');
});

var getChatServer = "getChatServer";
router.use(`/${getChatServer}`,function (req,res,next) {
    var Controller = require("../httpController/gate/GateController");
    var ctrler = new Controller();
    ctrler.init(req,res,next);
    ctrler[getChatServer]();
});

// router.use("/:func",function (req,res,next) {
//     var func = req.params.func;
//     var Controller = require("../httpController/gate/GateController");
//     var ctrler = new Controller();
//     if(ctrler[func]){
//         ctrler.init(req,res,next);
//         ctrler[func]();
//     }else{
//         next();
//     }
// })


module.exports = router;
