
var logger = require("../logger/IFLogger");
var dispatcher = require("../../common/utils/dispatcher")
var error = require("../../common/error/IFError");

function BaseControllerFuncs() {

}


BaseControllerFuncs.prototype.init = function(){
    this.logger = logger;
    this.dispatcher = dispatcher;
    this.error = error;
}

module.exports = BaseControllerFuncs;