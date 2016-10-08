
'user strict'

var BaseController = require("../BaseController");
var Funcs = require("./SetupFuncs");


var util = require('util');


function SetupController() {
    this.funcs = new Funcs();
}

util.inherits(SetupController,BaseController);


SetupController.prototype.initialDatabase = function () {
    var self = this;
    this.funcs.initialDataBase(function (err) {
        var ret = null;
        if (err){
            ret = self.error.newError(this.error.Code.E_FAIL);
        }else{
            ret = self.error.success(null);
        }
        self.pri.res.send(ret);
    });
    
}

module.exports = SetupController;