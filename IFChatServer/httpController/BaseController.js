

var error = require("../../common/error/IFError");
var dispatcher = require("../../common/utils/dispatcher")
var logger = require("../logger/IFLogger");

function Controller()
{

}

Controller.prototype.init = function(req,res,next)
{
    this.pri = {
        req:req,
        res:res,
        next:next
    };
    this.error = error;
    this.logger = logger;
}

Controller.prototype.checkParams = function(keys) {
    var len = keys.length;
    var i = 0;
    for(;i<len;i++){
        var key = keys[i];
        var value = this.pri.req.body[key];
        if(value == null){
            return false;
        }
    }
    return true;
}


module.exports = Controller;