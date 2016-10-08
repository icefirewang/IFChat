var BaseControllerFuncs = require("../BaseControllerFuncs");


var util = require('util');



function SetupFuncs() {
    this.init();
}

util.inherits(SetupFuncs,BaseControllerFuncs);


SetupFuncs.prototype.initialDataBase = function (cb) {
    var models = require("../../mysql_models");
    models.sequelize.sync().then(function(){
        console.log("initial database end");
        cb(null);
    }).catch(function(err){
        console.log(err);
        cb(err);
    });
}


module.exports = SetupFuncs;