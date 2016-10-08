
var error = require("../../common/error/IFError");
var logger = require("../logger/IFLogger");
var dispatcher = require("../../common/utils/dispatcher")

function BaseController()
{

}

BaseController.prototype.init = function(req,res,next)
{
    this.pri = {
        req:req,
        res:res,
        next:next
    };

    this.dispatcher = dispatcher;
    this.logger = logger;
    this.error = error;

}

BaseController.prototype.checkParams = function(keys) {
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



module.exports = BaseController;