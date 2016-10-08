'use strict'

var hprose = require("hprose");
var logger = require("../logger/IFLogger");
var Error = require("../../common/error/IFError");


function RPCClient(server) {
    this.uri = "http://"+server.innerHost+":"+server.innerPort;
    logger.debug("uri:"+this.uri);
    this.pri = {};

}

RPCClient.prototype.client = function () {
    var self = this;
    if(this.pri.client == null){
        this.pri.client = new hprose.HttpClient(this.uri,['sendWSIMMessage'],{timeout:1000});
        this.pri.client.on('error',function (name,err) {

            logger.error(__dirname + " " + err);
            err.code = Error.Code.E_RPC_ERROR;
            if(self.pri.errorCallback){
                self.pri.errorCallback(err);
            }
        });
    }
    return this.pri.client;
}

RPCClient.prototype.setErrorCallback = function (cb) {
    if(this.pri.errorCallback != null){
        logger.error("callback set twice");
        return;
    }
    this.pri.errorCallback = cb;
}

RPCClient.prototype.sendWSIMMessage = function (msg,cb) {
   this.setErrorCallback(cb);
   this.client().sendWSIMMessage(msg,function (code) {
        console.log(code);
        cb(null,code);
    });
}


module.exports = RPCClient;