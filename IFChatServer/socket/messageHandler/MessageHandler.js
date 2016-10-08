/*
*
*   MessageHander.js
*
*   收到消息的服务端处理,与长连接协议无关部分
*
* */
'use strict'

var logger = require("../../logger/IFLogger");
var IFSocket = require("../../../common/models/IFSocket/IFSocket");


function MessageHandler() {
    this.pro.init = this.prototype.init;
}

MessageHandler.prototype.init = function(sender,msg){
    
    this.sender = sender;
    this.msg = msg;
}

MessageHandler.prototype.work = function(){
    console.log("MH_work");
}




module.exports = MessageHandler;