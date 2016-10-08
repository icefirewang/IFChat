

/* 消息类型 */
var MessageType ={};

/*系统消息*/
MessageType.SYSTEM_NO_SESSION = 1; // 未登录
MessageType.SYSTEM_ERROR = 2;       // 服务器错误
MessageType.SYSTEM_KICK_BY_OTHER = 3; // 其它地方登录

/*用户消息*/

MessageType.USER_TEXT = 1000;
MessageType.USER_IMAGE = 1001;
MessageType.USER_VOICE = 1002;


MessageType.USER_MIN = MessageType.USER_TEXT;
MessageType.USER_MAX = MessageType.USER_VOICE;
/*--------------------------*/



module.exports = MessageType;
