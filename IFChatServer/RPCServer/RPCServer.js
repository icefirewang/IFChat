'use strict'

var hprose = require("hprose");
var error = require("../../common/error/IFError");
var server = null;
var logger = require("../logger/IFLogger");

init();

function init() {
    var serverSelf = global.data.serverSelf;
    var serverAdr = "http://"+serverSelf.innerHost + ":" +serverSelf.innerPort;
    var server = new hprose.Server(serverAdr);
    server.addAsync(sendWSIMMessage);
    server.start();
    logger.debug("RPC server :"+serverAdr);
    logger.info("RPCServer init over");

}



function sendWSIMMessage(msgObj,cb) {
    msgObj.updatedAt = undefined;
    var wsKey = ""+msgObj.receiverId+"@"+msgObj.receiverType;
    var ws = global.data.wsMap[wsKey];
    if(ws == null){
       cb(error.Code.E_USER_OFFLINE);
       return;
    }
    var json = JSON.stringify(msgObj);
    logger.debug("send im message \n"+json);
    ws.send(json);
    cb(error.Code.E_NONE);
}






