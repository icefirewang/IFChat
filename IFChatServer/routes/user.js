'use strict'

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("/user");
    res.send('respond with a resource');
});


var regist = "regist";
router.use(`/${regist}`, function(req, res, next) {
    var UserController = require("../httpController/user/UserController");
    var ctrler = new UserController();
    ctrler.init(req,res,next);
    ctrler[regist]();
});

var login = "login";
router.use(`/${login}`, function(req, res, next) {
    console.log("/login");
    var UserController = require("../httpController/user/UserController");
    var ctrler = new UserController();
    ctrler.init(req,res,next);
    ctrler[login]();
});


router.use("/:func",function (req,res,next) {
    var func = req.params.func;
    var Controller = require("../httpController/user/UserController");
    var ctrler = new Controller();
    if(ctrler[func]){
        ctrler.init(req,res,next);
        ctrler[func]();
    }else{
        next();
    }
})


module.exports = router;


module.exports = router;
