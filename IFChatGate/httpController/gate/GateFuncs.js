
var BaseControllerFuncs = require("../BaseControllerFuncs");


var util = require('util');



function GateFuncs() {
    this.init();
}

util.inherits(GateFuncs,BaseControllerFuncs);

GateFuncs.prototype.getChatServer = function(account) {
    var chatServers =  global.data.servers.IFChatServer;
    var dispatchKey = account;
    this.logger.info(chatServers);

    var server = this.dispatcher(dispatchKey,chatServers);
    return server;
}


module.exports = GateFuncs;
