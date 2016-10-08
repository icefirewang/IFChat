
var MessageModel = require("../MessageModel")

var Type = require("../MessageType");
var SocketUser = require("../../socketUser/SocketUser");

var util = require("util")


function SystemMessage(mType,rType,rId) {
    this.init();
    this.mType = mType;
    if(mType == Type.SYSTEM_ERROR){
        this.rUser = new SocketUser(rType,rId);
        this.mContent = this.defaultMessage(null);
    }

    if (mType == Type.SYSTEM_NO_SESSION){
        this.mContent = this.defaultMessage(null);
    }

    if (mType == Type.SYSTEM_KICK_BY_OTHER){
        this.mContent = this.defaultMessage();
    }

    console.log(this);
}

util.inherits(SystemMessage,MessageModel);


module.exports = SystemMessage;