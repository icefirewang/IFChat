/**
 * Created by icefire_wang on 2016/10/7.
 */
'use strict'


var models = require("../../mysql_models");
var redis = require("../../managers/RedisManager")();
var logger = require("../../logger/IFLogger");
var error = require("../../../common/error/IFError");
var IFChat = require("../../../common/models/IFSocket/IFSocket");
var RPCClient = require("../../RPCClient/RPCClient");
function IFChatWSSender() {

}

IFChatWSSender.prototype.init = function (msg) {
    var self = this;
    this.msg = msg;
    this.rId = msg.receiverId;
    this.rType = msg.receiverType;

}

IFChatWSSender.prototype.send = function (cb) {
    var self = this;
    var key = `${this.rId}@${this.rType}`;
    redis.get(key,function (err,value) {
        if(err){
            logger.error(__dirname + err);
            err.code = error.Code.E_REDIS_ERROR;
            cb(err);
            return;
        }
        if(value == null){
            logger.debug("user no connected");
            cb(null,0);
            return;
        }
        var info = JSON.parse(value);
        var serverId = info.serverId;

        var tarServer = global.data.chatServers[serverId];
        var rpcClient = new RPCClient(tarServer);
        var obj = self.msg.toJSON();
        rpcClient.sendWSIMMessage(obj,function (err,code) {
            if(err){
                cb(err);
                return;
            }
            // 发送成功,设置状态为已发送
            if(code == error.Code.E_NONE){
                self.msg.status = IFChat.Message.Status.Receive;
                self.msg.save(function (err) {
                    logger.error(err);
                });
                logger.debug("server info "+serverId);
            // 发送失败
            }else{

            }
            cb(null,self.msg.status);
        });
    });
}





module.exports = IFChatWSSender;