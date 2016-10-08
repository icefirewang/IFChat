
var logger = require("../logger/IFLogger");
var dispatcher = require("../../common/utils/dispatcher")

function BaseControllerFuncs() {

}


BaseControllerFuncs.prototype.init = function(){
    this.logger = logger;
    this.dispatcher = dispatcher;
}

module.exports = BaseControllerFuncs;