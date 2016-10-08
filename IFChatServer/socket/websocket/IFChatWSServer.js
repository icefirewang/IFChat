
var Funcs = require("./IFChatWSFuncs");
var wsUtil = require("./utils");
var logger = require("../../logger/IFLogger");
var IFSocket = require("../../../common/models/IFSocket/IFSocket");

/*
*
*   websocke server class
*
* */
var Server = function (httpServer) {
    var self = this;
    this.funcs = new Funcs();
    // 创建 server
    var WebSocketServer = require('ws').Server;
    var wsServer = new WebSocketServer({server:httpServer});
    wsServer.on('connection',function (ws) {
        self.onConnection(ws);
    })
}

/*
*
*   connect 处理函数
* */

Server.prototype.onConnection = function(ws){
    console.log("ws connected");
    var self = this;
    wsUtil.getSession(ws,function (err,session) {
        // 出错处理
        if(err){
            logger.error(__dirname + err);
            var type = IFSocket.Message.Type.SYSTEM_ERROR;
            var message = new IFSocket.Message.SystemMessage(type);
            self.funcs.sendMessage(ws,message);
            ws.close();
            return;
        }

        // session 为空处理
        if(session == null){
            logger.debug("no session");
            var type = IFSocket.Message.Type.SYSTEM_NO_SESSION;
            var message = new IFSocket.Message.SystemMessage(type);
            self.funcs.sendMessage(ws,message);
            ws.close();
            return;
        }
        console.log("session connnected "+session);


        ws.session = session;
        ws.key = session.userId + "@" + session.userType;
        self.funcs.onConnection(ws);

    })
}


module.exports = Server;