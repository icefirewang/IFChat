
'use strict'


var util = require("util");
var MessageHandler = require("./MessageHandler");

function WSMessageHandler() {
    this.super = WSMessageHandler.super_.prototype;
    console.log(this.super);
}

util.inherits(WSMessageHandler,MessageHandler);

WSMessageHandler.prototype.init = function(ws,msg){
    var sender = {
        senderType : ws.session.userType,
        senderId : ws.session.userId
    }
    console.log(WSMessageHandler.super_);
    this.super.init(sender,msg);
    //WSMessageHandler.super_.prototype.init(sender,msg);
    console.log(this.sender);
    console.log(this.msg);
}


WSMessageHandler.prototype.work = function() {
    this.super.work();
}




module.exports = WSMessageHandler;