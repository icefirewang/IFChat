

var MessageType = require("./MessageType");
var SocketUser = require("../socketUser/SocketUser");


/* 消息默认内容 中文 */
var MessageZh = {};
MessageZh[MessageType.SYSTEM_NO_SESSION] = "无效session";
MessageZh[MessageType.SYSTEM_ERROR] = "服务器错误";
MessageZh[MessageType.SYSTEM_KICK_BY_OTHER] = "您已在其它地方登录";

function MessageModel() {


}

MessageModel.prototype.init = function () {
    this.mId = 0;           // 消息ID
    this.mType = 0;         // 消息类型
    this.mContent = "";     // 内容
    this.sUser = null;      // 发送者
    this.rUser = null;      // 接收者
    this.ts = new Date().getTime();     // 时间戳
}


/*
 *
 *   默认 消息内容
 *   @type 消息类型
 *   @lan  语言种类
 *
 * */
MessageModel.prototype.defaultMessage = function (lan) {
    var ret = null;
    if(lan == null){
        ret = MessageZh[this.mType];
    }
    return ret;
}



module.exports= MessageModel;