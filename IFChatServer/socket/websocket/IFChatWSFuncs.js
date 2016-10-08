

var logger = require("../../logger/IFLogger");
var wsUtil = require("./utils");
var Handler = require("../messageHandler/WSMessageHander");
var redis = require("../../managers/RedisManager")();
var IFSocket = require("../../../common/models/IFSocket/IFSocket");

function IFChatWSFuncs() {

}

/*
*  连接处理
*
* */
IFChatWSFuncs.prototype.onConnection = function (ws) {
    var self = this;

    var wsKey = ws.key;
    var oldWs = global.data.wsMap[wsKey];
    self.closeWSByServer(wsKey,oldWs,IFSocket.Message.Type.SYSTEM_KICK_BY_OTHER,function (err) {
        if (err){
            self.closeWSByServer(null,ws,IFSocket.Message.Type.SYSTEM_ERROR);
            return;
        }else{
            // 保存信息到redis 中
            var data = {
                serverId : global.data.serverSelf.id
            }
            var jsonData = JSON.stringify(data);
            redis.set(wsKey,jsonData,function (err,reply) {
                if(err){
                    logger.error(__dirname + err);
                    var type = IFSocket.Message.Type.SYSTEM_ERROR;
                    self.closeWSByServer(wsKey,ws,type);
                    return;
                }
                console.log(reply);
                self.onConnectSuccess(ws);
            });
        }
    });


}

/*
*   连接成功处理
*
* */
IFChatWSFuncs.prototype.onConnectSuccess = function (ws) {
    var self = this;
    /*
     *   收到消息处理
     * */
    ws.on('message',function (message) {
        self.onMessage(ws,message);
    });

    /*
    *   连接关闭处理
    * */
    ws.on('close',function () {
        self.onClose(ws);
    });

    var wsKey = ws.key;
    global.data.wsMap[wsKey] = ws;
}



IFChatWSFuncs.prototype.sendMessage = function (ws,message) {
    var json = JSON.stringify(message);
    ws.send(json);
}

IFChatWSFuncs.prototype.onMessage = function (ws,message) {
    //logger.info(message);
    console.log("ws receive message "+message);
    var userId = ws.session.userId;
    var userType = ws.session.userType;
    try{
        var msgObj = JSON.parse(message);
    }catch (err){
        console.error(err);
        logger.error(__dirname + err);
        return;
    }
    var mType = msgObj.mType;
    var handler = new Handler();
    handler.init(ws,message);
}


/*
*
*  被动关闭
*
* */
IFChatWSFuncs.prototype.onClose = function (ws) {
    var wsKey = ws.key;
    global.data.wsMap[wsKey] = undefined;
    redis.del(wsKey,function (err,value) {
        if(err){

        }
    });
    console.log('ws closed');
}

/*
*   服务器主动关闭连接
*   @ws 连接
*   @message 消息
* */
IFChatWSFuncs.prototype.closeWSByServer = function (wsKey,ws,systemMessageType,cb) {
    // 有传 key 的情况 先删除 redis 内的信息

    var self = this;
    if(ws){
        self.closeWSWithMessage(ws,systemMessageType);
    }

    // 删除 redis 信息
    if(wsKey){
        self.delWSRedisInfo(wsKey,cb);
    }else{
        cb(null);
    }
}


IFChatWSFuncs.prototype.delWSRedisInfo = function (wsKey,cb) {
    redis.del(wsKey,function (err,value) {
        if(err){
            console.error(err);
            cb(err);
        }else {
            console.log(`del wsKey:${wsKey} success :${value}`);
            cb(null);
        }
    });
}

IFChatWSFuncs.prototype.closeWSWithMessage = function (ws,systemMessageType) {
    var self = this;
    if(systemMessageType) {
        var message = new IFSocket.Message.SystemMessage(systemMessageType);
        self.sendMessage(ws, message);
    }
    ws.close();
}

module.exports = IFChatWSFuncs;